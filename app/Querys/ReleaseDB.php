<?php

namespace App\Querys;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

class ReleaseDB
{
  /**
   * Devuelve todas las publicaciones del usuario logueado
   *
   * @return Collection|null
   */
  public function getUserRelease(): ?Collection
  {
    $user = auth()->user();
    return $user->releases()->with(['labels', 'likes'])->get();
  }

  /**
   * Devuelve todas las publicaciones de los usuarios seguidos
   *
   * @return SupportCollection|Array
   */
  public function getReleaseFollowArtists(): array|SupportCollection
  {
    $user = auth()->user();
    $data =  $user
      ->followingArtists()
      ->with(['following.releases' => fn ($query) => $query->with(['labels', 'likes', 'creator'])])
      ->get();

    // devolver solo los artistas que tengan publicaciones
    $data = $data->filter(fn ($artist) => $artist->following->releases->count() > 0);

    // devolver solo las publicaciones de los artistas
    $data = $data->count() ?  $data->pluck('following.releases')->flatten() : [];

    return $data;
  }
}
