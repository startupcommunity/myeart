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
        $data = $user->with(['followingArtists.following.userArtistic', 'followingArtists.following.profile'])->first();
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
        $data = User::with(['userArtistic', 'profile'])
            ->whereHas(
                'profile',
                fn ($pro) => $pro->where('perfil', ProfileTypeEnum::ARTIST)
            )->where('id', '<>', $user->id);


        return $data->paginate(self::PAGINATE_ARTIST, '*', 'page', $filters['page']);
    }
}
