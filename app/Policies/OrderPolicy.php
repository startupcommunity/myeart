<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class OrderPolicy
{
  use HandlesAuthorization;

  /**
   * Determina si el usuario puede ver sus items
   * de la orden generada
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function getItems(User $user, Order $order)
  {
    return $user->id === $order->user_id;
  }

  /**
   * Determina si el usuario puede ver los datos de una orden
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function getOrder(User $user, Order $order)
  {
    return $user->id === $order->user_id;
  }

  /**
   * Determina si el usuario puede ver los datos de un item de una orden
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function getItem(User $user, OrderItem $item)
  {
    // return $user->id === $item->user_id && $user->id === $item->order->user_id;

    // si es el usuario que genero la orden
    // o el dueño de la obra
    // return $user->id === $item->order->user_id || $user->id === $item->user_id;
    return true;
  }

  /**
   * Determina si el usuario puede ver sus ordenes
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function getUserOrders(User $user)
  {
    $auth = auth()->user();
    return $user->id === $auth->id;
  }
}
