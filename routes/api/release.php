<?php

use App\Http\Controllers\UserReleaseController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'releases'], function () {

  /**
   * Devuelve todas las publicaciones del usuario logueado
   */
  Route::get('/get-user-releases', [UserReleaseController::class, 'getUserRelease'])->name('getUserRelease');

  /**
   * Almacena los datos y crea una nueva publicación
   */
  Route::post('/store', [UserReleaseController::class, 'store'])->name('store');
});
