<?php

use App\Http\Controllers\UserReleaseController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'releases'], function () {

  /**
   * Devuelve todas las publicaciones del usuario logueado
   */
  Route::get('/get-user-releases', [UserReleaseController::class, 'getUserRelease'])->name('getUserRelease');

  /**
   * Devuelve todas las publicaciones de los usuarios seguidos
   */
  Route::get('/get-follow-artists-releases', [UserReleaseController::class, 'getReleaseFollowArtists'])
    ->name('getReleaseFollowArtists');

  /**
   * Almacena los datos y crea una nueva publicación
   */
  Route::post('/store', [UserReleaseController::class, 'store'])->name('storeRelease');

  /**
   * Almacena los datos y actualiza una publicación
   */
  Route::put('/update/{id}', [UserReleaseController::class, 'update'])->name('updateRelease');

  /**
   * Elimina una publicación
   */
  Route::delete('/delete/{id}', [UserReleaseController::class, 'destroy'])->name('deleteRelease');
});
