<?php

namespace App\Factories;

use App\Enums\ArtworkStateEnum;
use App\Enums\ItemStatusEnum;
use App\Enums\OrderStatusEnum;
use App\Enums\TypeNotificationEnum;
use App\Models\Artwork;
use App\Models\Order;
use App\Models\ShoppingCart;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Events\NotificationEvent;
use App\Querys\OrderDB;
use App\Utils\Payment\Stripe;
use Exception;
use Illuminate\Support\Str;

class ShoppingCartFactory
{
  private $tax = 15;    // 15% de impuesto por la app

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
   * Crea un intento de pago con los datos
   * del carrito y el usuario que paga
   *
   * @return string
   */
  public function intent(): ?string
  {
    $tripe = new Stripe();
    $user = auth()->user();

    // obtener los items del carrito de compras
    $items = $user->shoppingCart()->get();

    if ($items == null || $items->count() == 0) {
      return null;
    }

    // obtener el total y subtotal de la compra
    $subtotal = $items->sum('artwork.total');

    // agregar el impuesto y el envío y los decimales
    $subT = floatval(number_format($subtotal, 2, ',', ''));   // subtotal formateado
    $totalFinal = $subT * 100;                                // total final en céntimos
    $random = Str::random(40);                                // random para el grupo de transferencia

    // crear intento de pago
    try {
      $intent = $tripe->createPaymentIntent([
        'amount' => $totalFinal,
        'currency' => 'eur',
        'payment_method_types' => ['card'],
        'transfer_group' => 'INTENT_' . $random, // grupo de transferencia
        'metadata' => [
          'account_id' => $user->stripe_account_id,
          'group' => 'INTENT_' . $random,
        ],
      ]);

      return $intent->client_secret;
    } catch (Exception $e) {
      return null;
    }
  }

  /**
   * Finaliza la compra
   *
   * @param Request $request
   * @return Order $order     devuelve la orden creada
   */
  public function finishShop($request): ?Order
  {
    $tra = DB::transaction(function () use ($request) {
      $user = auth()->user();   // usuario logueado
      $tax = $this->tax;        // tax en % de la app
      $stripe = new Stripe();   // instancia de stripe
      $orderDB = new OrderDB(); // instancia de la clase de consultas de ordenes

      // request
      $paymentIntentId = $request->payment_intent;                  // id del intento de pago
      $paymentIntentCSId = $request->payment_intent_client_secret;  // id del intento de pago cliente secreto

      // verificar si ya existe una orden con este intento de pago
      // si existe no se crea otra orden
      $ord = Order::where('payment_intent_id', $paymentIntentId)->first();
      if ($ord) {
        return $orderDB->getItems($ord->id);
      }

      // obtener el intento de pago
      $payment = $stripe->getPaymentIntent($paymentIntentId);   // intento de pago procesado
      $group = $payment->metadata['group'];                     // grupo de transferencia
      $shipping = $payment->shipping->toArray();                // datos de envío
      $source = $payment->latest_charge;                        // datos del pago, solo usar si es un pago pendiente

      $items = $user->shoppingCart()->get();                    // items u obras del carrito de compras
      $subtotal = $items->sum('artwork.total');                 // subtotal
      $total = $subtotal;                                       // total

      // crear la orden
      $order = $user->orders()->create([
        'subtotal' => $subtotal,
        'tax' => $tax,
        'shipping' => 0,
        'total' => $total,
        'status' => OrderStatusEnum::PENDING,
        'payment_method' => 'stripe',
        'payment_intent_id' => $paymentIntentId,
        'payment_intent_client_secret_id' => $paymentIntentCSId,
        'transfer_group'  => $group,
        'source_transaction' => $source,
      ]);

      // agregar los items a la orden
      foreach ($items as $item) {
        // números random para cada item, int de 18 números
        $random = rand(100000000000000000, 999999999999999999);
        $frontPhoto = $item->artwork->getFrontPhoto();

        $order->items()->create([
          'number'      => $random,
          'artwork_id'  => $item->artwork_id,
          'user_id'     => $item->artwork->user_id,
          'price'       => $item->artwork->total,
          'quantity'    => 1,
          'title'       => $item->artwork->title,
          'photo'       => $frontPhoto,
          'status'      => ItemStatusEnum::SHIPPED,
        ]);

        // pasar los items a estado vendido
        $item->artwork->update(['state' => ArtworkStateEnum::SOLD]);

        // Evento de notificacion para compra
        $data = [
          'user_id' => $user->id,
          'notifiable_id' => $item->artwork->user_id,
          'url' => '/usuario/perfil/' . $item->artwork->user_id . '/sale',
          'message' => "Ha comprado su obra",
          'type' => TypeNotificationEnum::BUY //'new-buy'
        ];

        event(new NotificationEvent($data));
      }

      // registrar la dirección de envío
      $order->shippingAddress()->create([
        'name'        => $user->name,
        'address'     => $shipping['address']['line1'],
        'city'        => $shipping['address']['city'],
        'postal_code' => $shipping['address']['postal_code'],
      ]);

      $order->shippingMethod()->create(['type' => 1]);    // 1 = envío gratis
      $user->shoppingCart()->delete();                    // eliminar el carrito de compras

      // consultar la orden recién creada
      return $orderDB->getItems($order->id);
    });

    return $tra;
  }
}
