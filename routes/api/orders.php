<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'orders'], function () {

  /**
   * Obtiene los artículos de una orden
   */
  Route::get('/get-items/{id}', [OrderController::class, 'getItems'])->name('getItemsOrders');
});
