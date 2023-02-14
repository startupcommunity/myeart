<?php

namespace App\Querys;

use App\Models\UserEvent;
use App\Querys\Traits\UserEventTrait;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class EventDB
{

  use UserEventTrait;

  /**
   * Devuelve el init builder
   *
   * @return Builder
   */
  public function initWithRelations(): Builder
  {
    return UserEvent::with(['user', 'likes']);
  }

  /**
   * @param int|string $id
   * @return UserEvent
   */
  public function find(int|string $id): ?UserEvent
  {
    // verificar si el id es un numero o un slug
    if (is_numeric($id)) {
      return $this->initWithRelations()->find($id);
    }

    // si es un slug
    return $this->initWithRelations()->where('slug', $id)->first();
  }

  /**
   * Devuelve todos los eventos
   *
   * @return Collection
   */
  public function all(Request $request = null): Collection
  {
    // eventos
    $events = $this->initWithRelations();

    // filtrar a partir de la fecha actual
    $events->current();

    // filtrar por
    if ($request->has('action')) {

      // filtrar por destacados (mas likes) si action = 1
      if ($this->isFeatured($request->action)) {
        $events->withCount('likes')->orderByDesc('likes_count');
      }

      // filtrar por semana si action = 3
      // filtrar los que comiencen la semana en curso
      if ($this->isWeek($request->action)) {
        $events->whereBetween('init_date', [now()->startOfWeek(), now()->endOfWeek()]);
      }

      // filtrar por amigos si action = 5
      // los amigos son los artistas que sigue el usuario
      if ($this->isFriends($request->action)) {
        $artistIDs = auth()->user()->followingArtists->pluck('following_id');
        $events->whereIn('user_id', $artistIDs);
      }
    }

    // excluir el id enviado
    if ($request->has('exclude')) {
      $events->where('id', '!=', $request->exclude);
    }

    // ordenar por
    if ($request->has('sortBy')) {

      // ordenar por mas reciente si sortBy = 1
      if ($this->isMoreRecent($request->sortBy)) {
        $events->orderByDesc('created_at');
      }

      // ordenar por orden alfabético si sortBy = 2
      if ($this->isAlphabeticalOrder($request->sortBy)) {
        $events->orderBy('name');
      }
    }

    return $events->get();
  }

  /**
   * Devuelve todos los eventos de un usuario
   *
   * @param int $id
   * @return Collection
   */
  public function getUserEvents(int $id): Collection
  {
    return $this->initWithRelations()
      ->where('user_id', $id)
      ->current()
      ->orderByDesc('created_at')
      ->get();
  }
}
