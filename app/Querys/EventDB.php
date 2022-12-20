<?php

namespace App\Querys;

use App\Models\UserEvent;
use App\Querys\Traits\UserEventTrait;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class EventDB
{

  use UserEventTrait;

  /**
   * @param int $id
   * @return UserEvent
   */
  public function find(int $id): UserEvent
  {
    return UserEvent::with(['user', 'likes'])->find($id);
  }

  /**
   * Devuelve todos los eventos
   *
   * @return Collection
   */
  public function all(Request $request = null): Collection
  {
    // eventos
    $events = UserEvent::with(['user', 'likes']);

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
}
