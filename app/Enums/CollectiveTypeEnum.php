<?php

/**
 * tipos de colectivos asociados a un colectivo
 *
 * @package App\Enums
 * @author  <Luisandev> https://luisan.dev
 */

namespace App\Enums;

final class CollectiveTypeEnum
{
  const GALLERY = 1;
  const PUBLIC_ADMINISTRATION = 2;
  const ASSOCIATION = 3;
  const FEDERATION = 4;
  const OTHERS = 5;

  public static function getTypes(): array
  {
    return [
      self::GALLERY => 'Galerías de Arte',
      self::PUBLIC_ADMINISTRATION => 'Administración Pública',
      self::ASSOCIATION => 'Asociación',
      self::FEDERATION => 'Federación',
      self::OTHERS => 'Otras Organizaciones',
    ];
  }

  public static function getType(int $type): string
  {
    return self::getTypes()[$type];
  }
}
