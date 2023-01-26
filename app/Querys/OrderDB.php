<?php

namespace App\Querys;

use App\Enums\ArtworkStateEnum;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Collection as SupportCollection;

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
      'items.artwork.categories', 'items.user'
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

    $orders = $user->orders()->with([
      'items.order.shippingAddress',
      'items.order.shippingMethod',
      'items.user',
      'shippingAddress',
      'shippingMethod'
    ]);

    if ($option) {
      $opt = intval($request->option);

      // todas las ordenes
      if ($opt === 1) {
        return $orders->get();
      }

      // ordenes de la semana en curso
      if ($opt === 2) {
        $orders->whereBetween('created_at', [
          now()->startOfWeek(),
          now()->endOfWeek()
        ])->get();
      }

      // ordenes del mes en curso
      if ($opt === 3) {
        $orders->whereBetween('created_at', [
          now()->startOfMonth(),
          now()->endOfMonth()
        ])->get();
      }

      // ordenes del mes pasado
      if ($opt === 4) {
        $orders->whereBetween('created_at', [
          now()->subMonth()->startOfMonth(),
          now()->subMonth()->endOfMonth()
        ])->get();
      }

      // ordenes del año en curso
      if ($opt === 5) {
        $orders->whereBetween('created_at', [
          now()->startOfYear(),
          now()->endOfYear()
        ])->get();
      }
    }

    return $orders->get();
  }

  /**
   * Obtiene las ventas de un usuario
   * artículos, ordenes, etc
   *
   * @param integer|null $id
   * @return Collection|array|SupportCollection
   */
  public function getUserSales(?int $id = null): Collection|array|SupportCollection
  {
    $user = $id ? User::find($id) : auth()->user();

    if (!$user) {
      abort(404);
    }

    // primero obtener los artículos vendidos
    $artworks = $user->artworks()->where('state', ArtworkStateEnum::SOLD)->get();

    // obtener las ordenes de los artículos y sus relaciones
    $orders = OrderItem::whereIn('artwork_id', $artworks->pluck('id'))
      ->with([
        'artwork.gallery',
        'order.shippingAddress',
        'order.shippingMethod'
      ])
      ->orderByDesc('created_at')
      ->get();

    // agrupar artículos por la misma orden
    $orders = $orders->groupBy('order_id');

    // obtener un array de las ordenes
    // con sus artículos
    $orders = $orders->map(function ($item, $key) {
      return [
        'order' => $item[0]->order,
        'artworks' => $item
      ];
    });

    return $orders->values();
  }
}
