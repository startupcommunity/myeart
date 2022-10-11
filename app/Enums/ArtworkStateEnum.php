<?php

namespace App\Enums;

use Illuminate\Support\Facades\Lang;

final class ArtworkStateEnum
{
    // publicada
    public const PUBLISHED = 1;

    // vendida
    public const SOLD = 2;

    // borrador
    public const DRAFT = 3;

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
            case self::SOLD:
                return Lang::get('Vendida');
            case self::DRAFT:
                return Lang::get('Borrador');
        }
    }
}
