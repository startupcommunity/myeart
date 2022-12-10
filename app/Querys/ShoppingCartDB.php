<?php

namespace App\Querys;

use Illuminate\Database\Eloquent\Collection;

class ShoppingCartDB
{
  /**
   * Obtiene los items del carrito de compras
   * del usuario logueado
   *
   * @return Collection
   */
  public function getItemsOfAuthUser(): Collection
  {
    $user = auth()->user();
    return $user->shoppingCart()->with([
      'artwork.gallery', 'artwork.user', 'artwork.categories'
    ])->get();
  }
}
