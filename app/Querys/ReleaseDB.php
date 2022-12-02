<?php

namespace App\Querys;

use Illuminate\Database\Eloquent\Collection;

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
}
