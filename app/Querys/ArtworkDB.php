<?php

namespace App\Querys;

use App\Enums\ArtworkStateEnum;
use App\Models\Artwork;
use App\Models\ArtworkLike;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use App\Events\NotificationEvent;

class ArtworkDB
{
    /**
     * Devuelve las obras del usuario logueado
     * o del usuario indicado por parámetro
     * junto a sus relaciones
     */
    public static function getUserArtworks($userID = null): Collection
    {
        $userID = !$userID ? auth()->user()->id : $userID;
        $data = Artwork::with(['categories', 'labels', 'gallery', 'user'])
            ->where('user_id', $userID)
            ->orderBy('id', 'Desc')
            ->get();

        return $data;
    }

    /**
     * Devuelve todas las obras publicadas de los usuarios
     */
    public static function getPublishArtworks(): Collection
    {
        return Artwork::with(['categories', 'labels', 'gallery', 'user', 'likes'])
            ->where('state', ArtworkStateEnum::PUBLISHED)
            ->typeArtist()
            ->orderBy('id', 'Desc')
            ->get();
    }

    /**
     * Devuelve una obra ordenada por sus imagenes
     *
     * @param Int $id       id de la obra
     */
    public static function getArtworkForID($id): Artwork
    {
        return Artwork::with(['categories'])
            ->with(['gallery' => function ($q) {
                return $q->orderBy('id', 'ASC');
            }])->findOrFail($id);
    }

    /**
     * Devuelve todas las obras publicadas del usuario indicado
     *
     * @param Int $userID           id del usuario
     * @param Int $artworkID        id de la obra a ignorar
     */
    public static function getPublishUserArtworks(int $userID, int $artworkID = null): Collection
    {
        $data = Artwork::with(['categories', 'labels', 'gallery', 'user', 'likes'])
            ->where('user_id', $userID)
            ->published()
            ->orderByDesc('id');

        // ignora una la obra indicada en caso de existir
        !$artworkID ?: $data->where('id', '<>', $artworkID);

        return $data->get();
    }

    /**
     * Devuelve las obras filtrada por una categoría
     * se puede indicar el usuario si se requiere ignorar
     * las obras de dicho usuario
     *
     * @param integer $categoryID        id de la categoría
     * @param integer|null $userID       id del usuario a ignorar
     */
    public static function getPublishForCategory(int $categoryID, int $userID = null): Collection
    {
        $data = Artwork::with(['categories', 'labels', 'gallery', 'user', 'likes'])
            ->orderByDesc('id')
            ->published()
            ->typeArtist()
            ->category($categoryID);

        // ignora el usuario indicada en caso de existir
        !$userID ?: $data->where('user_id', '<>', $userID);

        return $data->get();
    }

    /**
     * Obtiene una obra por medio de su id
     *
     * @param integer $id           El id de la obra
     * @return Artwork
     */
    public static function getArtwork(int $id): Artwork
    {
        return Artwork::findOrFail($id);
    }

    /**
     * Devuelve una obra con sus relaciones indicadas
     *
     * @param integer $id           el id de la obra
     * @return Artwork
     */
    public static function getArtworkWithRelations(int $id): Artwork
    {
        $art =  self::getArtwork($id);

        return $art->load(['categories', 'subcategories', 'labels', 'gallery', 'user.profile', 'likes', 'views']);
    }

    /**
     * Elimina una obra de forma soft para no ser visualizada por el usuario
     *
     * @param integer $id           id de la obra
     * @return boolean
     */
    public static function softDelete(int $id): bool
    {
        $artwork = self::getArtwork($id);

        if ($artwork) {
            return $artwork->delete();
        }

        return false;
    }

    /**
     * Marca una obra como "me gustada" por el usuario logueado
     *
     * @param integer $id           id de la obra
     * @return boolean
     */
    public static function liked(int $id): bool
    {
        $artwork = self::getArtwork($id);
        $user = auth()->user();

        $created = $artwork->likes()->create(['user_id' => $user->id]);

        //Evento para Notificación de Like a obra
        $data = [
        'user_id' => $user->id,
        'notifiable_id' => $artwork->user_id,
        'url' => '/obras/'.$artwork->id,
        'message' => "Le gustó tu obra",
        'type' => 'new-like-artwork'
        ];
        event(new NotificationEvent($data));

        return is_object($created);
    }

    /**
     * elimina una obra como "me gustada" por el usuario logueado
     *
     * @param integer $id           id de la obra
     * @return boolean
     */
    public static function disliked(int $id): bool
    {
        $user = auth()->user();
        $liked = ArtworkLike::where('artwork_id', $id)->where('user_id', $user->id);

        return $liked->delete();
    }

    /**
     * Devuelve las obras de respectivos usuarios
     * filtradas por tipo colectivo
     *
     * @param array $ids                ids de los usuarios
     * @param integer $collectiveID     id del colectivo
     * @return Collection
     */
    public static function getArtworksByUsers(array $ids, int $collectiveID): Collection
    {
        $relations = ['categories', 'subcategories', 'labels', 'gallery', 'user.profile', 'likes'];
        return Artwork::with($relations)
            ->whereIn('user_id', $ids)
            ->where('collective_id', $collectiveID)
            ->published()
            ->typeCollective()
            ->orderByDesc('created_at')
            ->get();
    }

    /**
     * Filtrar las obras publicadas de todos los usuarios
     *
     * @param array $filters            Filtros
     * @return LengthAwarePaginator
     */
    public static function filterPublished(array $filters): LengthAwarePaginator
    {
        // query
        $relations = ['categories', 'labels', 'gallery', 'user', 'likes'];
        $data = Artwork::with($relations)->published()->typeArtist();
        $filter = (object) $filters;

        // conditions
        $hasCategory = property_exists($filter, 'category');
        $hasCatAndSub = $hasCategory && property_exists($filter, 'subcategory');
        $hasCatAndSubAndLabel = $hasCategory && $hasCatAndSub && property_exists($filter, 'label');

        // orden
        $data->sortByOption($filter->sortBy);

        // por categoría
        !$hasCategory ?: $data->category($filter->category);

        // por subcategoria
        !$hasCatAndSub ?: $data->category($filter->category, $filter->subcategory);

        // por etiqueta
        !$hasCatAndSubAndLabel ?: $data->category($filter->category, $filter->subcategory, $filter->label);

        // filtros numéricos
        $data->weight($filter->weight)
            ->width($filter->width)
            ->large($filter->large)
            ->price($filter->price);

        return $data->paginate(6, '*', 'page', $filters['page']);
    }
}
