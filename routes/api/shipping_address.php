<?php

use App\Http\Controllers\ShippingAddressController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'shippingAddress'], function () {

  /**
   * Devuelve las direcciones de envío del usuario logueado
   */
  Route::get('/getShippingAddress', [ShippingAddressController::class, 'getUserShippingAddress'])->name('getShippingAddress');

  /**
   * guarda una nueva dirección
   */
  Route::post('/save', [ShippingAddressController::class, 'save'])->name('saveShippingAddress');

  /**
   * Actualiza una dirección
   */
  Route::put('/update/{id}', [ShippingAddressController::class, 'update'])->name('updateShippingAddress');

  /**
   * Elimina una dirección
   */
  Route::delete('/delete/{id}', [ShippingAddressController::class, 'delete'])->name('deleteShippingAddress');
});
