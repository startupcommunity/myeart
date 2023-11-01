<?php

namespace App\Enums;

final class ShippingMethodStatusEnum
{
  const AGREE_WITH_SELLER = 1;

  public static function getLabel($value)
  {
    switch ($value) {
      case self::AGREE_WITH_SELLER:
        return 'Acordar con el vendedor';
      default:
        return 'Unknown';
    }
  }
}
