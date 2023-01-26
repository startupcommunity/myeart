<?php

namespace App\Factories;

use App\Enums\ArtworkStateEnum;
use App\Enums\ItemStatusEnum;
use App\Enums\OrderStatusEnum;
use App\Models\Artwork;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderFactory
{

  public function __construct(
    private Order $model
  ) {
  }

  /**
   * Cancela una orden
   *
   * @param integer $id       ID de la orden
   * @param Request $request  Request
   * @return boolean
   */
  // public function cancelOrders(Request $request, int $id): ?bool
  // {
  //   $tra = DB::transaction(function () use ($id, $request) {
  //     $order = $this->model->find($id);

  //     // si el pedido ya fue cancelado
  //     // no se puede cancelar de nuevo
  //     if ($order->status === OrderStatusEnum::CANCELED) {
  //       return false;
  //     }

  //     // cancelar
  //     $order->update(['status' => OrderStatusEnum::CANCELED]);

  //     // las obras vuelven a estar disponibles para su compra
  //     $order->items()->each(function ($item) {
  //       $item->artwork->update(['state' => ArtworkStateEnum::PUBLISHED]);
  //     });

  //     return true;
  //   });

  //   return $tra;
  // }

  /**
   * Cancela el item de una orden
   *
   * @param Request $request
   * @return boolean
   */
  public function cancelItem(Request $request): ?bool
  {
    $tra = DB::transaction(function () use ($request) {
      $order = $this->model->find($request->order_id);

      // si el usuario no es el dueño/creador de la orden
      // no se puede cancelar
      if ($order->user_id !== $request->user_id) {
        return false;
      }

      // si el pedido ya fue cancelado
      // no se puede cancelar el item
      if ($order->status === OrderStatusEnum::CANCELED) {
        return false;
      }

      // Todo: devolver el dinero al comprador y devolver la obra al vendedor

      // se cancela el item indicado
      $order
        ->items()
        ->where('id', $request->item_id)
        ->update(['status' => ItemStatusEnum::CANCELED]);

      // cambiar el estado de la obra a disponible
      Artwork::find($request->item_id)
        ->update(['state' => ArtworkStateEnum::PUBLISHED]);

      // si todos los items fueron cancelados la orden cambia su estado
      if ($order->allItemsCanceled()) {
        $order->update(['status' => OrderStatusEnum::CANCELED]);
      }

      return true;
    });

    return $tra;
  }

  /**
   * Confirma el item de una orden
   *
   * @param Request $request
   * @return boolean
   */
  public function confirmItem(Request $request): ?bool
  {
    $tra = DB::transaction(function () use ($request) {
      $order = $this->model->find($request->order_id);

      // si el usuario no es el dueño/creador de la orden
      // no se puede cancelar
      if (!$order->isOwner($request->user_id) || $order->isCanceled()) {
        return false;
      }

      // Aprobar el item, cambiar estado
      $order
        ->items()
        ->where('id', $request->item_id)
        ->update(['status' => ItemStatusEnum::DELIVERED]);

      // agrega el rating a la orden
      $order->rating()->create([
        'rating' => $request->rating,
        'comment' => $request->comment,
        'user_id' => $order->user_id,
        'item_id' => $request->item_id,
      ]);

      // si todos los items fueron aprobadas, la orden cambia su estado
      if ($order->allItemsApproved()) {
        $order->update(['status' => OrderStatusEnum::DELIVERED]);
      }

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
      if ($order->isApproved()) {
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
