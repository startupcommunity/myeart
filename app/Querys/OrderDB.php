<?php

namespace App\Querys;

use App\Models\Order;
use Illuminate\Database\Eloquent\Collection;

class OrderDB
{
  /**
   * Obtiene los artículos de una orden
   *
   * @param integer $orderID
   * @return Order|null
   */
  public function getItems(int $orderID): ?Order
  {
    $order = $this->getOrder($orderID);
    return $order->with([
      'items.artwork.gallery', 'items.artwork.categories', 'items.artwork.user'
    ])->first();
  }

  /**
   * Obtiene una orden en especifico
   *
   * @param integer $id
   * @return Order|null
   */
  public function getOrder(int $id): ?Order
  {
    $order = Order::find($id);

    if (!$order) {
      abort(404);
    }

    return $order;
  }
}
