<?php

/**
 * Gestión de querys/consultas sobre el modulo Usuario
 * @luisandev
 */

namespace App\Querys;

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

        // dd($data['followingArtists']);

        return $data['followingArtists'];
    }
}
