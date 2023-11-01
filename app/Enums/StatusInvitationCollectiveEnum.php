<?php

namespace App\Enums;

final class StatusInvitationCollectiveEnum
{
  const PENDING = 1;
  const ACCEPTED = 2;
  const REJECTED = 3;

  public static function getValues(): array
  {
    return [
      self::PENDING,
      self::ACCEPTED,
      self::REJECTED,
    ];
  }

  public static function getLabels(): array
  {
    return [
      self::PENDING => 'Pendiente',
      self::ACCEPTED => 'Aceptado',
      self::REJECTED => 'Rechazado',
    ];
  }

  public static function getLabel($value): string
  {
    return self::getLabels()[$value];
  }
}
