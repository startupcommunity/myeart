<?php

namespace App\Enums;

final class ItemStatusEnum
{
  const PENDING = 0;
  const SHIPPED = 1;
  const DELIVERED = 2;
  const CANCELED = 3;

  public static function getValues(): array
  {
    return [
      self::PENDING,
      self::SHIPPED,
      self::DELIVERED,
      self::CANCELED,
    ];
  }

  public static function getLabels(): array
  {
    return [
      self::PENDING => 'Pendiente',
      self::SHIPPED => 'Enviado',
      self::DELIVERED => 'Entregado',
      self::CANCELED => 'Cancelado',
    ];
  }
}
