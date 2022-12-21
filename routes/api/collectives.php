<?php

use App\Http\Controllers\CollectiveController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'collectives'], function () {

  /**
   * Crea u nuevo colectivo para el usuario autenticado
   */
  Route::post('/store', [CollectiveController::class, 'store'])->name('collectiveStore');
});
