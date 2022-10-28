<?php

namespace App\Querys;

use App\Enums\ArtworkStateEnum;
use App\Models\Artwork;
use App\Models\ArtworkLike;
use Illuminate\Database\Eloquent\Collection;

class ArtworkDB
{
    /**
     * Devuelve las obras del usuario logueado
     * junto a sus relaciones
     */
    public static function getUserArtworks(): Collection
    {
        $userID = auth()->user()->id;
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
            ->orderBy('id', 'Desc')
            ->get();
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
     * Filtrar las obras publicadas de todos los usuarios
     *
     * @param array $filters            Filtros
     * @return Collection
     */
    public static function filterPublished(array $filters): Collection
    {
        // query
        $data = Artwork::with(['categories', 'labels', 'gallery', 'user', 'likes'])
            ->where('state', ArtworkStateEnum::PUBLISHED);
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

        return $data->get();
    }
}
