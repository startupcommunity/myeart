<?php

namespace App\Factories;

use App\Models\Artwork;
use App\Models\ShoppingCart;
use App\Models\User;

class ShoppingCartFactory
{

  /**
   * Verifica si el item esta disponible
   *
   * @param integer $artworkID    ID de la obra
   * @return boolean
   */
  public function isItemAvailable(int $artworkID): bool
  {
    $art = Artwork::find($artworkID);
    return $art->isAvailable();
  }

  /**
   * agrega una obra al carrito de compras
   * del usuario
   *
   * @param Request $request
   * @return ShoppingCart|null
   */
  public function addItemToCart($request): ?ShoppingCart
  {
    $user = User::find($request->user_id);

    // si ya la obra en este u otro carrito de compras
    // entonces no se agrega
    $available = $this->isItemAvailable($request->artwork_id);

    if ($available) {
      // add to cart
      return $user->shoppingCart()->create([
        'artwork_id' => $request->artwork_id,
      ]);
    }

    return null;
  }

  /**
   * Elimina un item del carrito de compras
   *
   * @param integer $artworkID
   * @return boolean
   */
  public function deleteItem(int $artworkID): bool
  {
    $user = auth()->user();

    // verificar si el item existe
    $item = ShoppingCart::where('user_id', $user->id)
      ->where('artwork_id', $artworkID)
      ->first();

    // si no existe, cancelar la operación
    if (!$item) {
      return false;
    }

    return $item->delete();
  }
}
