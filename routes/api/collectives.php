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
   * Devuelve las obras de un colectivo
   */
  Route::get('/get-artworks/{id}', [CollectiveController::class, 'getArtworks'])->name('getCollectiveArtworks');

  /**
   * Devuelve las obras de un colectivo filtrado por request
   */
  Route::get('/get-filters-artworks/{id}', [CollectiveController::class, 'getFilterArtworks'])->name('getCollectiveFilterArtworks');

  /**
   * Devuelve todos los colectivos
   * filtrados por request y paginados
   */
  Route::get('/get-all', [CollectiveController::class, 'getAllCollectives'])->name('getAllCollectives');

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

  /**
   * Agrega un like al colectivo
   */
  Route::post('/like', [CollectiveController::class, 'addLike'])->name('addLikeCollective');

  /**
   * Elimina un like al colectivo
   */
  Route::post('/dislike', [CollectiveController::class, 'removeLike'])->name('removeLikeCollective');

  /**
   * Seguir un colectivo
   */
  Route::post('/follow', [CollectiveController::class, 'followCollective'])->name('followCollective');

  /**
   * Dejar de seguir un colectivo
   */
  Route::post('/unfollow', [CollectiveController::class, 'unfollowCollective'])->name('unfollowCollective');

  /**
   * Acepta la invitación a un colectivo
   */
  Route::post('/accept-invitation', [CollectiveController::class, 'acceptInvitation'])->name('acceptInvitationCollective');

  /**
   * Rechaza la invitación a un colectivo
   */
  Route::post('/decline-invitation', [CollectiveController::class, 'declineInvitation'])->name('declineInvitationCollective');
});
