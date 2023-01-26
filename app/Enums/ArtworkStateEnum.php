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

    // en carrito
    public const IN_CART = 4;
}
