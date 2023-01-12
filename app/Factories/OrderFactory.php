<?php

namespace App\Factories;

use App\Enums\ArtworkStateEnum;
use App\Enums\OrderStatusEnum;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderFactory
{

  public function __construct(private Order $model)
  {
  }

  /**
   * Cancela una orden
   *
   * @param integer $id       ID de la orden
   * @param Request $request  Request
   * @return boolean
   */
  public function cancelOrders(Request $request, int $id): ?bool
  {
    $tra = DB::transaction(function () use ($id, $request) {
      $order = $this->model->find($id);

      // si el pedido ya fue cancelado
      // no se puede cancelar de nuevo
      if ($order->status === OrderStatusEnum::CANCELED) {
        return false;
      }

      // cancelar
      $order->update(['status' => OrderStatusEnum::CANCELED]);

      // las obras vuelven a estar disponibles para su compra
      $order->items()->each(function ($item) {
        $item->artwork->update(['state' => ArtworkStateEnum::PUBLISHED]);
      });

      return true;
    });

    return $tra;
  }

  /**
   * Confirma una orden
   *
   * @param Request $request
   * @return boolean
   */
  public function confirmOrders(Request $request): ?bool
  {
    $tra = DB::transaction(function () use ($request) {
      $order = $this->model->find($request->order_id);

      // si el pedido ya fue confirmado
      // no se puede confirmar de nuevo
      if ($order->status === OrderStatusEnum::DELIVERED) {
        return false;
      }

      // confirmar
      $order->update(['status' => OrderStatusEnum::DELIVERED]);

      // las obras ya no están disponibles para su compra
      $order->items()->each(function ($item) {
        $item->artwork->update(['state' => ArtworkStateEnum::SOLD]);
      });

      // agrega el rating a la orden
      $order->rating()->create([
        'rating' => $request->rating,
        'comment' => $request->comment,
        'user_id' => $order->user_id,
      ]);

      return true;
    });

    return $tra;
  }
}
