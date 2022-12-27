<?php

use App\Http\Controllers\CollectiveController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'collectives'], function () {

  /**
   * Crea u nuevo colectivo para el usuario autenticado
   */
  Route::post('/store', [CollectiveController::class, 'store'])->name('collectiveStore');

  /**
   * Actualiza un colectivo
   */
  Route::put('/update/{id}', [CollectiveController::class, 'update'])->name('collectiveUpdate');

  /**
   * devuelve un colectivo
   */
  Route::get('/get-collective/{id}', [CollectiveController::class, 'getCollective'])->name('getCollective');

  /**
   * devuelve todos los colectivos del usuario autenticado
   * o indicado por el parámetro
   * incluye los colectivos creados e invitado
   */
  Route::get('/get-user-collectives/{id?}', [CollectiveController::class, 'getUserCollective'])->name('getUserCollective');

  /**
   * actualiza la foto de perfil de un colectivo
   */
  Route::put('/update-profile-photo/{id}', [CollectiveController::class, 'updateProfilePhoto'])->name('updateProfilePhotoCollective');

  /**
   * actualiza la foto de portada de un colectivo
   */
  Route::put('/update-front-photo/{id}', [CollectiveController::class, 'updateFrontPhoto'])->name('updateFrontPhotoCollective');
});
