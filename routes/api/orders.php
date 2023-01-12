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
});
