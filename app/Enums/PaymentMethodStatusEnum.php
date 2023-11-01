<?php

namespace App\Enums;

final class PaymentMethodStatusEnum
{
  const ACTIVE = 1;
  const INACTIVE = 0;

  public static function getValues(): array
  {
    return [
      self::ACTIVE,
      self::INACTIVE,
    ];
  }

  public static function getLabels(): array
  {
    return [
      self::ACTIVE => 'Activo',
      self::INACTIVE => 'Inactivo',
    ];
  }
}
