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

    /**
     * Devuelve los artistas seguidos por el usuario logueado
     *
     * @param int|null $userID
     */
    public function getFollowArtists($userID = null): Collection
    {
        $user = $userID ? User::findOrFail($userID) : auth()->user();
        $data = $user->with([
            'followingArtists.following.userArtistic', 'followingArtists.following.profile'
        ])->first();
        return $data['followingArtists'];
    }

    /**
     * Devuelve todos los artistas de la app, excluyendo
     * el usuario logueado y los eliminados
     *
     * @return Collection
     */
    public function getArtists(array $filters): LengthAwarePaginator
    {
        $user = auth()->user();
        $data = $filters;
        $cat = isset($data['category']) ? $data['category'] : null;
        $sub = isset($data['subcategory']) ? $data['subcategory'] : null;
        $label = isset($data['label']) ? $data['label'] : null;

        // query
        $query = User::with(['userArtistic', 'profile', 'artworks.gallery'])
            ->artist()->notUser($user->id);

        // si se recibe algunas de las categorías
        if ($cat || $sub || $label) {
            $query->artworkCategory($cat, $sub, $label);
        }

        return $query->paginate(self::PAGINATE_ARTIST, '*', 'page', $data['page']);
    }

    /**
     * Devuelve los datos de un artista
     *
     * @param int $id
     * @return User
     */
    public function getArtist(int $id): User
    {
        return User::with([
            'userArtistic', 'profile', 'artworks.gallery', 'socialNetwork'
        ])->findOrFail($id);
    }
}
