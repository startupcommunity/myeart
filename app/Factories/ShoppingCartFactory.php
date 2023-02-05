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
use Exception;
use Stripe\PaymentIntent;
use Stripe\Stripe;
use Stripe\StripeClient;
use Stripe\Transfer;

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

  public function intent()
  {
    Stripe::setApiKey(env('STRIPE_SECRET'));

    $user = auth()->user();

    // obtener los items del carrito de compras
    $items = $user->shoppingCart()->get();

    // obtener el total y subtotal de la compra
    $subtotal = $items->sum('artwork.price');

    // agregar el impuesto y el envío y los decimales
    $total = $subtotal;
    $total = floatval(number_format($total, 2, ',', ''));
    $platformTax = 15;
    $calc = ($total * $platformTax) / 100;
    $totalFinal = ($total + $calc) * 100;

    // crear intento de pago
    $intent = PaymentIntent::create([
      'amount' => $totalFinal,
      'currency' => 'eur',
      'payment_method_types' => ['card'],
      'transfer_group' => 'ORDER_' . $user->id,
      'customer' => $user->stripe_customer_id,
    ]);

    return $intent->client_secret;
  }

  /**
   * Finaliza la compra
   *
   * @param Request $request
   * @return order $order     devuelve la orden creada
   */
  public function finishShop($request): bool
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
      $total = floatval(number_format($total, 2, ',', ''));
      $platformTax = 15;
      $calc = ($total * $platformTax) / 100;
      $totalFinal = ($total + $calc) * 100;


      // conecta a stripe
      Stripe::setApiKey(env('STRIPE_SECRET'));
      // $stripe = new StripeClient(env('STRIPE_SECRET'));

      // payment method id
      // $paymentMethodID = $request->payment_method_id;

      foreach ($items as $item) {
        // crea la transferencia a la cuenta conectada
        $formatPrice = floatval(number_format($item->artwork->price, 2, ',', ''));
        $transfer = Transfer::create([
          'amount' => $formatPrice,
          'currency' => 'eur',
          'destination' => $item->artwork->user->stripe_account_id,
          'transfer_group' => 'ORDER_' . $user->id,
        ]);
      }

      return true;

      // dd($request->all(), $intent, $checkout_session);

      // crear la orden
      // $order = $user->orders()->create([
      //   'status' => OrderStatusEnum::PENDING,
      //   'subtotal' => $subtotal,
      //   'tax' => $request->tax,
      //   'shipping' => $request->shipping,
      //   'total' => $total,
      // ]);

      // agregar los items a la orden
      // foreach ($items as $item) {
      //   $random = $item->artwork->id . date('Ymd');
      //   $frontPhoto = $item->artwork->getFrontPhoto();

      //   $order->items()->create([
      //     'number'      => $random,
      //     'artwork_id'  => $item->artwork_id,
      //     'user_id'     => $item->artwork->user_id,
      //     'price'       => $item->artwork->price,
      //     'quantity'    => 1,
      //     'title'       => $item->artwork->title,
      //     'photo'       => $frontPhoto,
      //     'status'      => ItemStatusEnum::SHIPPED,
      //   ]);

      //   // pasar los items a estado vendido
      //   $item->artwork->update(['state' => ArtworkStateEnum::SOLD]);

      //   // Evento de notificacion para compra
      //   $data = [
      //     'user_id' => $user->id,
      //     'notifiable_id' => $item->artwork->user_id,
      //     'url' => '/obras/' . $item->artwork->id,
      //     'message' => "Ha comprado su obra",
      //     'type' => TypeNotificationEnum::BUY //'new-buy'
      //   ];

      //   event(new NotificationEvent($data));
      // }

      // registrar la dirección de envío
      // $order->shippingAddress()->create([
      //   'name'        => $user->name,
      //   'address'     => $request->address,
      //   'city'        => $request->city,
      //   'postal_code' => $request->postal_code,
      // ]);

      // registrar el método de envió
      // $order->shippingMethod()->create(['type' => $request->shipping_method]);

      // eliminar los items del carrito de compras
      // $user->shoppingCart()->delete();

      // return $order;
    });

    return $tra;
  }
}
