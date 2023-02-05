<?php

namespace App\Factories;

use App\Models\PaymentMethod;
use Illuminate\Http\Request;

class PaymentMethodFactory
{
  public function __construct(
    private PaymentMethod $payment
  ) {
  }

  /**
   * Agrega un método de pago
   *
   * @param Request $request
   * @return null|PaymentMethod
   */
  public function addPaymentMethod(Request $request): ?PaymentMethod
  {
    $this->setAllPaymentMethodsAsNotDefault($request->user_id);

    return $this->payment->create($request->all());
  }

  /**
   * Coloca todos los métodos de pago del usuario como no predeterminados
   *
   * @param int $user_id
   * @return void
   */
  public function setAllPaymentMethodsAsNotDefault(int $user_id): void
  {
    $this->payment->where('user_id', $user_id)->update(['default' => 0]);
  }

  /**
   * Coloca el ultimo método de pago que se agrego como predeterminado
   * del usuario indicado
   *
   * @param int $user_id
   * @return void
   */
  public function setLastPaymentMethodAsDefault(int $user_id): void
  {
    $lastPayment = $this->payment->where('user_id', $user_id)->latest()->first();
    $lastPayment->update(['default' => 1]);
  }

  /**
   * Elimina un método de pago
   *
   * @param int $id   Id del método de pago
   * @return bool
   */
  public function deletePaymentMethod(int $id): bool
  {
    $payment = $this->payment->find($id);
    $deleted =  $payment->delete();
    $this->setAllPaymentMethodsAsNotDefault($payment->user_id);
    $this->setLastPaymentMethodAsDefault($payment->user_id);

    return $deleted;
  }
}
