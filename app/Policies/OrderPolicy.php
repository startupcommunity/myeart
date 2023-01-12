<?php

namespace App\Policies;

use App\Models\Order;
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
