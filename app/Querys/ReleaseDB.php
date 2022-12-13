<?php

namespace App\Querys;

use App\Models\UserRelease;
use App\Querys\Traits\UseReleaseTrait;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

class ReleaseDB
{

  use UseReleaseTrait;

  /**
   * Devuelve una publicación por su id
   *
   * @param integer $id
   * @return UserRelease|null
   */
  public function getReleaseById($id): ?UserRelease
  {
    return UserRelease::find($id);
  }

  /**
   * Devuelve todas las publicaciones del usuario logueado
   *
   * @return Collection|null
   */
  public function getUserRelease(): ?Collection
  {
    $user = auth()->user();
    return $user->releases()->with([
      'labels', 'likes.user', 'creator.artworks.categories', 'comments'
    ])->get();
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

  /**
   * Devuelve los comentarios de una publicación
   *
   * @param integer $id
   * @return UserRelease|null
   */
  public function getComments(int $id): ?UserRelease
  {
    $release = $this->getReleaseById($id);

    // publicaciones con sus comentarios y likes
    // comentarios con sus likes y respuestas
    $release->load(['creator.artworks.categories', 'likes.user', 'comments.user', 'comments.likes', 'comments.answer.user']);

    // ordenar por fecha de creación
    $release->comments = $release->comments->sortByDesc('created_at');

    // devolver la publicación con sus comentarios
    return $release;
  }
}
