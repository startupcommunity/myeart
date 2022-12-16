<?php

namespace App\Querys;

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
}
