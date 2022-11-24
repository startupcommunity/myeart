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
}
