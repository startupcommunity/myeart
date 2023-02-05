<?php

use App\Http\Controllers\ChargingMethodController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'charging-methods'], function () {
  /**
   * Agrega un método de cobro
   */
  Route::post('/store', [ChargingMethodController::class, 'store'])->name('addChargingMethod');

  /**
   * Elimina uyn método de cobro
   */
  Route::delete('/delete/{id}', [ChargingMethodController::class, 'delete'])->name('deleteChargingMethod');

  /**
   * Actualiza un método de cobro
   */
  Route::put('/update/{id}', [ChargingMethodController::class, 'update'])->name('updateChargingMethod');
});
