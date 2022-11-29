<?php

/**
 * Gestión de querys/consultas sobre el modulo Usuario
 * @luisandev
 */

namespace App\Querys;

use App\Enums\ProfileTypeEnum;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class UserDB
{
    private const PAGINATE_ARTIST = 8;
    private const PAGINATE_ALL_ARTIST = 999999;

    /**
     * Devuelve los artistas seguidos por el usuario logueado
     *
     * @param int|null $userID
     */
    public function getFollowArtists($userID = null): Collection
    {
        $user = $userID ? User::findOrFail($userID) : auth()->user();
        $data = $user->with([
            'followingArtists.following.profile',
            'followingArtists.following.artworks.categories'
        ])->first();

        return $data['followingArtists'];
    }

    /**
     * Devuelve todos los artistas de la app, excluyendo  los eliminados
     * y los que no tengan obras subidas
     * 
     * @return Collection
     */
    public function getArtists(array $filters): LengthAwarePaginator
    {
        $data = $filters;
        $cat = isset($data['category']) ? $data['category'] : null;
        $sub = isset($data['subcategory']) ? $data['subcategory'] : null;
        $label = isset($data['label']) ? $data['label'] : null;
        $all = isset($data['all']) ? $data['all'] : null;

        // query
        $query = User::with(['userArtistic', 'profile', 'artworks.gallery', 'artworks.categories'])
            ->withCount('artworks')
            ->having('artworks_count', '>', 0);

        // si se recibe algunas de las categorías
        if ($cat || $sub || $label) {
            $query->artworkCategory($cat, $sub, $label);
        }

        // si se desea todos los artistas
        if ($all) {
            return $query->paginate(self::PAGINATE_ALL_ARTIST, '*', 'page', $data['page']);
        }

        return $query->paginate(self::PAGINATE_ARTIST, '*', 'page', $data['page']);
    }

    /**
     * Devuelve los datos de un artista
     *
     * @param int $id
     * @return User
     */
    public function getArtist(int $id): ?User
    {
        return User::with([
            'profile', 'artworks.gallery', 'socialNetwork'
        ])
            ->withCount('artworks')
            ->withCount('followingArtists')
            ->withCount('followers')
            ->find($id);
    }
}
