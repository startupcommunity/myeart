<?php

namespace App\Querys;

use App\Querys\Traits\UseReleaseTrait;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

class ReleaseDB
{

  use UseReleaseTrait;

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
  public function getReleaseFollowArtists($request = null): array|SupportCollection
  {
    $user = auth()->user();
    $sortBy = $this->getSortByInt($request->sortBy);
    $option1 = $this->isMoreRecent($sortBy);
    $option2 = $this->isAlphabeticalOrder($sortBy);

    // artistas y sus publicaciones
    $data =  $user->followingArtistReleases()->get();

    // devolver solo los artistas que tengan publicaciones
    $data = $data->filter(fn ($artist) => $artist->following->releases->count());

    // devolver solo las publicaciones de los artistas
    $data = $data->count() ? $data->pluck('following.releases')->flatten() : $data;

    // se filtra por la mas reciente
    $data = $option1 ? $data->sortByDesc('created_at')->values() : $data;

    // se filtra por orden alfabético
    $data = $option2 ? $data->sortBy('text')->values() : $data;

    return $data;
  }
}
