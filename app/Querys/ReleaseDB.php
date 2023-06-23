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
   * Devuelve todas las publicaciones de la app
   *
   * @return Collection
   */
  public function getAllReleases(): Collection
  {
    return UserRelease::with([
      'labels.user', 'likes.user', 'creator.artworks.categories', 'comments'
    ])->get();
  }

  /**
   * Devuelve una publicación por su slug
   *
   * @param string $slug
   * @return UserRelease|null
   */
  public function getReleaseBySlug(string $slug): ?UserRelease
  {
    return UserRelease::where('slug', $slug)->first();
  }

  /**
   * Devuelve todas las publicaciones del usuario logueado
   * del panel del perfil del artista
   *
   * @param integer $id
   * @return Collection|null
   */
  public function getUserRelease(int $id = null): ?Collection
  {
    $user = $id ? User::find($id) : auth()->user();
    $relations = ['labels.user', 'likes.user', 'creator.artworks.categories', 'comments'];
    return $user->releases()->with($relations)->commonType()->get();
  }

  /**
   * Devuelve todas las publicaciones de los usuarios seguidos
   *
   * @return SupportCollection|Array
   */
  public function getReleaseFollowArtists($request = null): array|SupportCollection
  {

    // con usuario logueado
    if (!auth()->user()) {
      return [];
    }

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

    // filtrar por el hashtag si se indica por request
    // hacer una búsqueda like a la cadena de texto de release.text
    $data = $request->hashtag ? $data->filter(fn ($release) => str_contains($release->text, $request->hashtag)) : $data;

    return $data;
  }

  /**
   * Devuelve los comentarios de una publicación
   *
   * @param integer|string $id
   * @return UserRelease|null
   */
  public function getComments(int|string $id): ?UserRelease
  {
    // verifica si el parámetro es un id o un slug
    $release = is_numeric($id) ? $this->getReleaseById($id) : $this->getReleaseBySlug(trim($id));

    if (!$release) {
      return null;
    }

    // publicaciones con sus comentarios y likes
    // comentarios con sus likes y respuestas
    $release->load(['creator.artworks.categories', 'likes.user', 'comments.user', 'comments.likes', 'comments.answer.user']);

    // ordenar por fecha de creación
    $release->comments = $release->comments->sortByDesc('created_at');

    // devolver la publicación con sus comentarios
    return $release;
  }
}
