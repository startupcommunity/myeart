<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'orders'], function () {

  /**
   * Obtiene los artículos de una orden
   */
  Route::get('/get-items/{id}', [OrderController::class, 'getItems'])->name('getItemsOrders');

  /**
   * Obtiene las ordenes de un usuario
   */
  Route::get('/get-user-orders/{id?}', [OrderController::class, 'getUserOrders'])->name('getUserOrders');

  /**
   * Cancelar una orden
   *
   * @param id  Id de la orden
   */
  Route::put('/cancel/{id}', [OrderController::class, 'cancelOrders'])->name('cancelOrders');

  /**
   * Cancela el item de una orden
   */
  Route::post('/cancel-item', [OrderController::class, 'cancelItem'])->name('cancelItemOrders');

  /**
   * Confirma el item de una orden
   */
  Route::post('/confirm-item', [OrderController::class, 'confirmItem'])->name('confirmItemOrders');

  /**
   * Confirma una orden de compra
   */
  Route::post('/confirm', [OrderController::class, 'confirmOrders'])->name('confirmOrders');


  // -------------------------------------
  // ventas - también cuenta como ordenes
  // -------------------------------------

  /**
   * Obtiene las ventas de un usuario
   */
  Route::get('/get-user-sales/{id?}', [OrderController::class, 'getUserSales'])->name('getUserSales');
});
