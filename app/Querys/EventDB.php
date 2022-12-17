<?php

namespace App\Querys;

use App\Models\UserEvent;
use Illuminate\Database\Eloquent\Collection;

class EventDB
{
  /**
   * @param int $id
   * @return UserEvent
   */
  public function find(int $id): UserEvent
  {
    return UserEvent::find($id);
  }

  /**
   * Devuelve todos los eventos
   *
   * @return Collection
   */
  public function all(): Collection
  {
    return UserEvent::with('user')->get();
  }
}
