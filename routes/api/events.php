<?php

use App\Http\Controllers\UserEventController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'events'], function () {

  /**
   * Crea u nuevo evento
   */
  Route::post('/store', [UserEventController::class, 'store'])->name('eventStore');

  /**
   * Obtiene todos los eventos
   */
  Route::get('/get-all', [UserEventController::class, 'all'])->name('getAllEvents');
});
