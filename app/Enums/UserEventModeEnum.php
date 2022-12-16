<?php

namespace App\Enums;

final class UserEventModeEnum
{
  // online
  public const ONLINE = 1;

  // presencial
  public const PRESENCIAL = 2;

  /**
   * get labels
   */
  public static function getLabels(): array
  {
    return [
      self::ONLINE => 'Online',
      self::PRESENCIAL => 'Presencial',
    ];
  }
}
