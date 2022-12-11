<?php

namespace App\Enums;

final class OrderStatusEnum
{
  const PENDING = 1;
  const PAID = 2;
  const CANCELED = 3;
  const SHIPPED = 4;
  const DELIVERED = 5;
  const REFUNDED = 6;

  public static function getValues(): array
  {
    return [
      self::PENDING,
      self::PAID,
      self::CANCELED,
      self::SHIPPED,
      self::DELIVERED,
      self::REFUNDED,
    ];
  }

  public static function getLabels(): array
  {
    return [
      self::PENDING => 'Pendiente',
      self::PAID => 'Pagado',
      self::CANCELED => 'Cancelado',
      self::SHIPPED => 'Enviado',
      self::DELIVERED => 'Entregado',
      self::REFUNDED => 'Reembolsado',
    ];
  }
}
