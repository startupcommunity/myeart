<?php

namespace App\Enums;

use Illuminate\Support\Facades\Lang;

final class ProfileTypeEnum
{
    // usuario
    public const USER = 1;

    // artista
    public const ARTIST = 2;

    /**
     * Conversion a string
     *
     * @return string
     */
    public function __toString(): string
    {
        switch ($this->value) {
            case self::USER:
                return Lang::get('Usuario');
            case self::ARTIST:
                return Lang::get('Artista');
        }
    }
}
