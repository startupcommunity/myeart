<?php

namespace App\Querys;

use App\Models\Order;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

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

  /**
   * Obtiene las ordenes de un usuario
   *
   * @param Request $request
   * @param integer|null $id
   * @return Collection
   */
  public function getUserOrders(Request $request, ?int $id = null): Collection
  {
    $option = $request->has('option');
    $user = $id ? User::find($id) : auth()->user();

    if (!$user) {
      abort(404);
    }

    $data = $user->orders()->with([
      'items.artwork.gallery',
      'shippingAddress',
      'shippingMethod'
    ]);

    if ($option) {
      $opt = intval($request->option);

      // todas las ordenes
      if ($opt === 1) {
        return $data->get();
      }

      // ordenes de la semana en curso
      if ($opt === 2) {
        $data->whereBetween('created_at', [
          now()->startOfWeek(),
          now()->endOfWeek()
        ])->get();
      }

      // ordenes del mes en curso
      if ($opt === 3) {
        $data->whereBetween('created_at', [
          now()->startOfMonth(),
          now()->endOfMonth()
        ])->get();
      }

      // ordenes del mes pasado
      if ($opt === 4) {
        $data->whereBetween('created_at', [
          now()->subMonth()->startOfMonth(),
          now()->subMonth()->endOfMonth()
        ])->get();
      }

      // ordenes del año en curso
      if ($opt === 5) {
        $data->whereBetween('created_at', [
          now()->startOfYear(),
          now()->endOfYear()
        ])->get();
      }
    }

    return $data->get();
  }
}
