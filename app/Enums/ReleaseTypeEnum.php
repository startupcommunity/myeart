<?php

namespace App\Enums;

final class ReleaseTypeEnum
{
  const ARTIST = 1;
  const COLLECTIVE = 2;

  public static function getValues(): array
  {
    return [
      self::ARTIST,
      self::COLLECTIVE,
    ];
  }

  public static function getLabels(): array
  {
    return [
      self::ARTIST => 'Artista',
      self::COLLECTIVE => 'Colectivo',
    ];
  }

  public static function getLabel($value): string
  {
    return self::getLabels()[$value];
  }
}
