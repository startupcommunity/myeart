<?php

namespace App\Enums;

use Illuminate\Support\Facades\Lang;

final class UserReleaseStatus
{
  // publicada
  public const PUBLISHED = 1;

  // oculta
  public const HiDDEN = 2;

  /**
   * Conversion a string
   *
   * @return string
   */
  public function __toString(): string
  {
    switch ($this->value) {
      case self::PUBLISHED:
        return Lang::get('Publicada');
      case self::HiDDEN:
        return Lang::get('Oculta');
    }
  }
}
