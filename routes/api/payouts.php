<?php

use App\Http\Controllers\PayoutController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'payouts'], function () {
  /**
   * Obtiene los artículos del carrito {}
   */
  Route::get('/get-details/{id}', [PayoutController::class, 'getPayoutDetails'])->name('getPayoutDetails');
});
