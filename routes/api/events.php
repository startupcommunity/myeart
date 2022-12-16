<?php

use App\Http\Controllers\UserEventController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'events'], function () {

  /**
   * Obtiene los artículos de una orden
   */
  Route::post('/store', [UserEventController::class, 'store'])->name('eventStore');
});
