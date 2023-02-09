<?php

namespace App\Enums;

final class ItemStatusEnum
{
  const PENDING = 0;
  const SHIPPED = 1;
  const DELIVERED = 2;
  const CANCELED = 3;
  const UNDELIVERED = 4;

  public static function getValues(): array
  {
    return [
      self::PENDING,
      self::SHIPPED,
      self::DELIVERED,
      self::CANCELED,
      self::UNDELIVERED,
    ];
  }

  public static function getLabels(): array
  {
    return [
      self::PENDING => 'Pendiente',
      self::SHIPPED => 'Enviado',
      self::DELIVERED => 'Entregado',
      self::CANCELED => 'Cancelado',
      self::UNDELIVERED => 'No entregado',
    ];
  }
}
