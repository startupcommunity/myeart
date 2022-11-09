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
   * Agrega una visita a la obra por medio del usuario logueado
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
}
