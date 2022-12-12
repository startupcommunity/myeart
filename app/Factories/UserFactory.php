<?php

namespace App\Factories;

use App\Models\User;

class UserFactory
{
  private $user;

  public function __construct(User $user)
  {
    $this->user = $user;
  }

  /**
   * Sigue a un artista
   *
   * @param Request $request
   * @return boolean
   */
  public function followArtist($request): bool
  {
    $follower = auth()->user();

    // no se puede seguir a el mismo
    if ($follower->id === $request->following_id) {
      return false;
    }

    $created = $follower->followingArtists()->create([
      'following_id' => $request->following_id
    ]);

    return $created ? true : false;
  }

  /**
   * Deja de seguir a un artista
   *
   * @param Request $request
   * @return boolean
   */
  public function unfollowArtist($request): bool
  {
    $follower = auth()->user();

    // dejar de seguir al artista indicado
    $deleted = $follower->followingArtists()
      ->where('following_id', $request->following_id)
      ->delete();

    return $deleted;
  }

  /**
   * Agrega una obra a favoritos del usuario
   *
   * @param Request $request
   * @return boolean
   */
  public function addFavoriteArtwork($request): bool
  {
    $user = auth()->user();
    $artwork = $user->favoriteArtworks()->where('artwork_id', $request->artwork_id);

    // obras del usuario
    $userArtworks = $user->artworks()->pluck('id');

    // si la obra pertenece a el
    if ($userArtworks->contains($request->artwork_id)) {
      return false;
    }

    // si la obra ya está en favoritos, no se agrega
    if ($artwork->exists()) {
      return false;
    }

    // caso contrario, se agrega
    $user->favoriteArtworks()->create(['artwork_id' => $request->artwork_id]);

    return true;
  }

  /**
   * Elimina una obra de los favoritos del usuario
   *
   * @param Request $request
   * @return boolean
   */
  public function removeFavoriteArtwork($request): bool
  {
    $user = auth()->user();
    $artwork = $user->favoriteArtworks()->where('artwork_id', $request->artwork_id);

    // si la obra no está en favoritos, no se elimina
    if (!$artwork->exists()) {
      return false;
    }

    // caso contrario, se elimina
    return $artwork->delete();
  }
}
