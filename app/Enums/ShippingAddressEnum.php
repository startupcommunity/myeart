<?php

namespace App\Enums;

use Illuminate\Support\Facades\Lang;

final class ShippingAddressEnum
{
    // PREDETERMINADA
    public const ACTIVE = 1;

    // DESACTIVADA
    public const DISABLED = 0;

    /**
     * Conversion a string
     *
     * @return string
     */
    public function __toString(): string
    {
        switch ($this->value) {
            case self::ACTIVE:
                return Lang::get('Predeterminada');
            case self::DISABLED:
                return Lang::get('Desactivada');
        }
    }
}
