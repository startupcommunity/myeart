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
   * Devuelve las publicaciones de un colectivo
   * tanto de los miembros como del creador
   */
  Route::get('/get-collective-releases/{id}', [CollectiveController::class, 'getReleaseCollective'])->name('getReleaseCollective');

  /**
   * Devuelve las publicaciones de un colectivo
   * filtradas por miembro o creador
   */
  Route::get('/get-collective-releases-by-option/{id}', [CollectiveController::class, 'getReleaseCollectiveByOption'])
    ->name('getReleaseCollectiveByOption');

  /**
   * devuelve todos los colectivos del usuario autenticado
   * o indicado por el parámetro
   * incluye los colectivos creados e invitado
   */
  Route::get('/get-user-collectives/{id?}', [CollectiveController::class, 'getUserCollective'])->name('getUserCollective');

  /**
   * Devuelve los miembros de un colectivo
   */
  Route::get('/get-members/{id}', [CollectiveController::class, 'getMembers'])->name('getCollectiveMembers');

  /**
   * actualiza la foto de perfil de un colectivo
   */
  Route::put('/update-profile-photo/{id}', [CollectiveController::class, 'updateProfilePhoto'])->name('updateProfilePhotoCollective');

  /**
   * actualiza la foto de portada de un colectivo
   */
  Route::put('/update-front-photo/{id}', [CollectiveController::class, 'updateFrontPhoto'])->name('updateFrontPhotoCollective');

  /**
   * Envía una invitación a un usuario para unirse a un colectivo
   */
  Route::post('/send-invitation', [CollectiveController::class, 'sendInvitation'])->name('sendInvitationCollective');

  /**
   * elimina un miembro del colectivo
   */
  Route::post('/remove-member', [CollectiveController::class, 'removeMember'])->name('removeMemberCollective');
});
