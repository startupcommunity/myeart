<?php

/**
 * Gestiona algunas funcionalidades de los colectivos
 * como algunas validaciones adicionales fuera de los modelos
 */

namespace App\Models\Traits;

trait CollectiveTrait
{
  /**
   * Verifica si el usuario es el creador del colectivo
   *
   * @param int|null $userID      ID del usuario a verificar
   */
  public function isCreator($userID = null): bool
  {
    if ($userID) {
      return $this->user_id === $userID;
    }

    return $this->user_id === auth()->id();
  }

  /**
   * Verificar si el usuario es miembro del colectivo
   *
   * @param int|null $userID      ID del usuario a verificar
   */
  public function isMember($userID = null): bool
  {
    if ($userID) {
      return $this->members()->where('user_id', $userID)->exists();
    }

    return $this->members()->where('user_id', auth()->id())->exists();
  }
}
