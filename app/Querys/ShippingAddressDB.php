<?php

namespace App\Querys;

use App\Models\ShippingAddress;
use Illuminate\Database\Eloquent\Collection;

class ShippingAddressDB
{
    /**
     * Devuelve las direcciones de envío del usuario logueado
     */
    public function getUserShippingAddress(): Collection
    {
        $userID = auth()->user()->id;
        return ShippingAddress::where('user_id', $userID)
            ->orderByDesc('id')
            ->get();
    }
}
