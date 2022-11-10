<?php

/**
 * Gestión de querys/consultas sobre el modulo Usuario
 * @luisandev
 */

namespace App\Querys;

use App\Enums\ProfileTypeEnum;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserDB
{
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
    public function getArtists(): Collection
    {
        $user = auth()->user();
        $data = User::with(['followingArtists.following.userArtistic', 'followingArtists.following.profile'])
            ->whereHas('profile', function ($profile) {
                $profile->where('perfil', ProfileTypeEnum::ARTIST);
            })->where('id', '<>', $user->id);

        return $data->get();
    }
}
