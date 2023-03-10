<?php

/**
 * Gestión de comisiones de la app
 *
 * @author luisandev <https://luisan.dev>
 */

namespace App\Enums;

final class AppTax
{
  const FOR_SALE = 15;

  public static function getValues(): array
  {
    return [
      self::FOR_SALE,
    ];
  }

  public static function getLabels(): array
  {
    return [
      self::FOR_SALE => '15%',
    ];
  }
}
