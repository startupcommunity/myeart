<?php

use App\Http\Controllers\PaymentMethodController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'payment-methods'], function () {
  /**
   * Agrega un método de pago
   */
  Route::post('/store', [PaymentMethodController::class, 'addPaymentMethod'])->name('addPaymentMethod');

  /**
   * Elimina uyn método de pago
   */
  Route::delete('/delete/{id}', [PaymentMethodController::class, 'deletePaymentMethod'])->name('deletePaymentMethod');
});
