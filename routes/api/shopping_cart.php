<?php

use App\Http\Controllers\ShoppingCartController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'cart'], function () {

  /**
   * agrega un item/obra al carrito
   */
  Route::post('/add-item', [ShoppingCartController::class, 'addItem'])->name('addItem');

  /**
   * Obtiene los artículos del carrito
   */
  Route::get('/get-items', [ShoppingCartController::class, 'getItems'])->name('getItems');

  /**
   * Obtiene el intent de pago
   */
  Route::get('/intent', [ShoppingCartController::class, 'intent'])->name('getIntent');

  /**
   * Elimina un item del carrito
   *
   * @param integer $artwork_id
   */
  Route::delete('/delete-item/{id}/{type}', [ShoppingCartController::class, 'deleteItem'])->name('deleteItem');

  /**
   * finalizar la compra
   */
  Route::post('/finish-shop', [ShoppingCartController::class, 'finishShop'])->name('finishShop');
});
