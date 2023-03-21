<?php

namespace App\Factories;

use App\Enums\ArtworkStateEnum;
use App\Enums\ItemStatusEnum;
use App\Enums\OrderStatusEnum;
use App\Enums\TypeNotificationEnum;
use App\Models\Artwork;
use App\Models\Order;
use App\Models\OrderItem;
use App\Utils\AppNotification;
use App\Utils\Payment\Stripe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderFactory
{

  public function __construct(
    private Order $model,
    private OrderItem $orderItem,
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
      if (!$order->isOwner($request->user_id) || $order->isCanceled()) {
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
      $artwork = Artwork::find($request->artwork_id);
      $isNotValid = !$order->isOwner($request->user_id) || $order->isCanceled() || !$artwork;
      $item = $order->items()->where('id', $request->item_id)->first();
      $delivered = intval($request->delivered);
      $isDelivered = $delivered === 1;

      // no se pudo cancelar
      if ($isNotValid || !$item) {
        return false;
      }

      // actualizar estado del item
      $item->update([
        'status' => $isDelivered ? ItemStatusEnum::DELIVERED : ItemStatusEnum::UNDELIVERED,
      ]);

      // agrega el rating a la orden
      $order->rating()->create($request->all());

      // si todos los items fueron aprobadas, la orden cambia su estado
      if ($order->allItemsApproved()) {
        $order->update(['status' => OrderStatusEnum::DELIVERED]);
      }

      // dd($artwork->user->stripe_account_id);

      // realizar el pago al vendedor
      if ($isDelivered) {
        $stripe = new Stripe();   // instancia de stripe
        $price = $item->price;    // precio del item
        $amount = $price * 100;   // cantidad a pagar
        $balance = $stripe->getBalance(); // saldo de la cuenta
        $available = $balance['available'][0]['amount']; // saldo disponible
        $available = $available / 100;                // saldo disponible en euros
        $isAvailableBalance = $available >= $price;   // si el saldo disponible es mayor o igual al precio del item

        $stripe->createTransfer([
          'amount' => $amount,
          'destination' => $artwork->user->stripe_account_id,
          'transfer_group' => $order->transfer_group,

          // si hay saldo disponible se ejecuta la transferencia de inmediato
          // si no se deja como pendiente hasta que haya saldo disponible
          'source_transaction' => $isAvailableBalance ? null : $order->source_transaction,
        ]);

        // enviar la notificacion al vendedor
        AppNotification::sendNoty([
          // 'user_id' => $artwork->user_id,
          'notifiable_id' => $artwork->user_id,
          'url' => '/usuario/perfil/' . $item->artwork->user_id . '/sale',
          'msj' => '¡Tu obra ha sido entregada! Recibirás el pago en unos días.',
          'type' => TypeNotificationEnum::ITEM_DELIVERED,
        ]);
      }

      return true;
    });

    // COMISIONES DE STRIPE
    // por cargo: 2.9% + 0.25€
    // por transferencia: 1.4% + 0.25€
    // por transferencia inmediata: 0.5% + 0.25€
    // por mantenimiento de cuentas conectadas: 2€ al mes si recibe una transferencia

    // SALDO Y TRANSFERENCIAS
    // no existe una retención del dinero en stripe
    // el dinero se "retiene" hasta que se realiza la transferencia
    // pero si este es retirado de stripe, la transferencia queda como pendiente
    // siempre que haya saldo disponible se ejecuta la transferencia de inmediato
    // si no se deja como pendiente hasta que haya saldo disponible.
    // por lo tanto, se debe manipular de forma manual el saldo de stripe
    // es decir, el saldo que se retira de stripe a la cuenta bancaria principal
    // debe ser solo el ganado por comisión (15%)
    // este punto ya Miguel decidirá cuanto y cuando se retira el dinero ganado por venta

    // orden del menu
    // PUBLICACIONES
    // MIS OBRAS
    // MIS PEDIDOS
    // MIS VENTAS
    // FAVORITOS
    // MIS CALIFICACIONES
    // DATOS PERSONALES
    // MIS DIRECCIONES
    // MÉTODOS DE COBRO
    // PRIVACIDAD Y SEGURIDAD

    // al editar un borrador
    // en colectivos, la ubicacion no es requerida

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

  /**
   * Envía mensajes entre comprador y vendedor
   *
   * @param Request $request
   * @return boolean
   */
  public function sendContactMessage(Request $request): ?bool
  {
    $tra = DB::transaction(function () use ($request) {
      $orderItem = $this->orderItem->find($request->order_item_id);
      $canceled = $orderItem && $orderItem->status === OrderStatusEnum::CANCELED;
      $delivered = $orderItem && $orderItem->status === OrderStatusEnum::DELIVERED;
      $refunded = $orderItem && $orderItem->status === OrderStatusEnum::REFUNDED;

      // no se pudo enviar el mensaje
      if (!$orderItem || $canceled || $delivered || $refunded) {
        return false;
      }

      // almacenar el mensaje
      $orderItem->messages()->create([
        'user_id' => $request->user_id,
        'message' => $request->message,
      ]);

      // el que envía el mensaje - notificador
      $notifiable_id = $orderItem->user_id === $request->user_id ? $orderItem->order->user_id : $orderItem->user_id;
      $msj = $orderItem->user_id === $request->user_id ? '¡El vendedor te ha dejado un mensaje!' : '¡El comprador te ha dejado un mensaje!';

      // notificar al usuario que corresponda
      AppNotification::sendNoty([
        'user_id' => $request->user_id,
        'notifiable_id' => $notifiable_id,
        'url' => '/pedidos/contactar/' . $request->order_item_id,
        'msj' => $msj,
        'type' => TypeNotificationEnum::MSJ_CONTACT_ORDER_ITEM,
      ]);

      return true;
    });

    return $tra;
  }
}
