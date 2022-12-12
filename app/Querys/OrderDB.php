<?php

namespace App\Querys;

use App\Models\Order;

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
    return $order->load([
      'items.artwork.gallery', 'items.artwork.categories', 'items.artwork.user'
    ]);
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
