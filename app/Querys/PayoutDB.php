<?php

namespace App\Querys;

use App\Utils\Payment\Stripe;
use Exception;

class PayoutDB
{
  public function __construct(private Stripe $stripe)
  {
  }

  /**
   * Devuelve los detalles de un pago
   */
  public function getPayoutDetails(string $payoutID): array
  {
    try {
      return $this->stripe->getPayout($payoutID)->toArray();
    } catch (Exception $e) {
      return ['msg' => $e->getMessage(), 'code' => $e->getCode()];
    }
  }
}
