<?php

namespace App\Querys;

use App\Models\Collective;
use App\Models\User;

class CollectiveDB
{
  public function __construct(
    private Collective $model,
    private User $user,
  ) {
  }

  /**
   * devuelve un colectivo
   *
   * @param int $id
   * @return Collective
   */
  public function getCollective(int $id): Collective
  {
    return $this->model->with(['categories.category', 'profile'])->findOrFail($id);
  }

  /**
   * Devuelve todos los colectivos del usuario
   * Ya sean creados o por invitación
   */
  public function getUserCollective(?int $id = null): array
  {
    $user = $id ? $this->user->find($id) : auth()->user();

    // primero obtener los colectivos creados
    $collectives = $user->collectives()->with(['categories.category', 'profile', 'user'])->get();

    // luego obtener los colectivos a los que pertenece
    $guests = $user->guestCollectives()->with(['collective.categories.category', 'collective.profile', 'collective.user'])->get();

    // unir los colectivos
    $collectives = $collectives->merge($guests);

    return $collectives->toArray();
  }
}
