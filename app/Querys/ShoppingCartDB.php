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
    $items = $user->shoppingCart()->with([
      'artwork.gallery', 'artwork.user.artworks.categories', 'artwork.categories','event.user','event.tickets'
    ])->get();

    /*foreach($items as $item){
      if(isset($item['event'])){
        unset($item["artwork"]);
        $item->artwork = [
          "title" => $item["event"]["name"]
        ];
      }
    }*/

    return $items;
  }
}
