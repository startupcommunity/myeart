<?php

namespace App\Factories;

use App\Enums\ArtworkStateEnum;
use App\Enums\OrderStatusEnum;
use App\Models\Artwork;
use App\Models\Order;
use App\Models\ShoppingCart;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Events\NotificationEvent;

class ShoppingCartFactory
{

  /**
   * Verifica si el item esta disponible
   *
   * @param integer $artworkID    ID de la obra
   * @return boolean
   */
  public function isItemAvailable(int $artworkID): bool
  {
    $art = Artwork::find($artworkID);
    return $art->isAvailable();
  }

  /**
   * agrega una obra al carrito de compras
   * del usuario
   *
   * @param Request $request
   * @return ShoppingCart|null
   */
  public function addItemToCart($request): ?ShoppingCart
  {
    $user = User::find($request->user_id);

    // si ya la obra en este u otro carrito de compras
    // entonces no se agrega
    $available = $this->isItemAvailable($request->artwork_id);

    if ($available) {
      // add to cart
      return $user->shoppingCart()->create([
        'artwork_id' => $request->artwork_id,
      ]);
    }

    return null;
  }

  /**
   * Elimina un item del carrito de compras
   *
   * @param integer $artworkID
   * @return boolean
   */
  public function deleteItem(int $artworkID): bool
  {
    $user = auth()->user();

    // verificar si el item existe
    $item = ShoppingCart::where('user_id', $user->id)
      ->where('artwork_id', $artworkID)
      ->first();

    // si no existe, cancelar la operación
    if (!$item) {
      return false;
    }

    return $item->delete();
  }

  /**
   * Finaliza la compra
   *
   * @param Request $request
   * @return order $order     devuelve la orden creada
   */
  public function finishShop($request): ?Order
  {
    $tra = DB::transaction(function () use ($request) {
      // obtener el usuario
      $user = auth()->user();

      // obtener los items del carrito de compras
      $items = $user->shoppingCart()->get();

      // obtener el total y subtotal de la compra
      $subtotal = $items->sum('artwork.price');

      // agregar el impuesto y el envío y los decimales
      $total = $subtotal + $request->tax + $request->shipping;
      $total = floatval(number_format($total, 2, '.', ''));

      // crear la orden
      $order = $user->orders()->create([
        'status' => OrderStatusEnum::PENDING,
        'subtotal' => $subtotal,
        'tax' => $request->tax,
        'shipping' => $request->shipping,
        'total' => $total,
      ]);

      // agregar los items a la orden
      foreach ($items as $item) {
        $order->items()->create([
          'artwork_id' => $item->artwork_id,
          'price' => $item->artwork->price,
          'quantity' => 1,
          'title' => $item->artwork->title,
        ]);

        // pasar los items a estado vendido
        $item->artwork->update(['state' => ArtworkStateEnum::SOLD]);

        // Evento de notificacion para compra
        $data = [
          'user_id' => $user->id,
          'notifiable_id' => $item->artwork->user_id,
          'url' => '/obras/'.$item->artwork->id,
          'message' => "Ha comprado su obra",
          'type' => 'new-buy'
        ];
        event(new NotificationEvent($data));
      }

      // registrar la dirección de envío
      $order->shippingAddress()->create([
        'name' => $user->name,
        'address' => $request->address,
        'city' => $request->city,
        'postal_code' => $request->postal_code,
      ]);

      // registrar el método de envió
      $order->shippingMethod()->create([
        'type' => $request->shipping_method,
      ]);

      // eliminar los items del carrito de compras
      $user->shoppingCart()->delete();

      // TODO: falta registrar el pago, pendiente

      return $order;
    });

    return $tra;
  }
}
