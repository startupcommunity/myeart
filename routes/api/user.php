<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\UserInformationsController;
use Illuminate\Support\Facades\Route;

Route::get('/user', [UserInformationsController::class, 'getAuthUser']);
Route::put('/registerPerfil', [UserInformationsController::class, 'create']);
Route::get('/users', [UserInformationsController::class, 'getAll']);
Route::get('/user-detail/{id}', [UserInformationsController::class, 'getUser']);
Route::post('/addOrUpdateUser', [UserInformationsController::class, 'addOrUpdateUser']);
Route::delete('/deleteUser/{id}', [UserInformationsController::class, 'deleteUser']);

Route::group(['prefix' => 'user'], function () {

  /**
   * Sigue a un artista indicado por request
   */
  Route::post('/follow-artist', [UserController::class, 'followArtist'])->name('followArtist');

  /**
   * Deja de seguir a un artista indicado por request
   */
  Route::post('/unfollow-artist', [UserController::class, 'unfollowArtist'])->name('unfollowArtist');

  /**
   * Devuelve los artistas seguidos por el usuario logueado
   */
  Route::get('/get-follow-artists', [UserController::class, 'getFollowArtists'])->name('getFollowArtists');

  /**
   * Devuelve los obras guardadas por el usuario logueado
   */
  Route::get('/get-follow-artworks', [UserController::class, 'getFollowArtworks'])->name('getFollowArtworks');

  /**
   * Devuelve las publicaciones guardadas por el usuario logueado
   */
  Route::get('/get-follow-releases', [UserController::class, 'getFollowReleases'])->name('getFollowReleases');

  /**
   * Devuelve los eventos guardados por el usuario logueado
   */
  Route::get('/get-follow-events', [UserController::class, 'getFollowEvents'])->name('getFollowEvents');

  /**
   * Devuelve los colectivos seguidos por el usuario logueado
   */
  Route::get('/get-follow-collectives', [UserController::class, 'getFollowCollectives'])->name('getFollowCollectives');

  /**
   * Devuelve los artistas seguidos por el usuario, solo la info corta y básica de los artistas,
   * como el nombre, el id...
   */
  Route::get('/get-follow-artists-short-info', [UserController::class, 'getFollowArtistsShortInfo'])
    ->name('getFollowArtistsShortInfo');

  /**
   * Devuelve todos los artistas de la app, excluyendo el usuario logueado y los eliminados
   * paginados
   */
  Route::get('/get-artists', [UserController::class, 'getArtists'])->name('getArtists');

  /**
   * Devuelve todos los artistas de la app, excluyendo el usuario logueado
   * de forma random
   */
  Route::get('/get-random-artists', [UserController::class, 'getRandomArtists'])->name('getRandomArtists');

  /**
   * Devuelve un usuario artista con sus respectivas relaciones
   */
  Route::get('/get-artist/{id}', [UserController::class, 'getArtist'])->name('getArtist');

  /**
   * Devuelve las notificaciones no leídas de un artista
   */
  // Route::get('/get-unread-notifications/{id}', [UserController::class, 'getUnreadNotifications'])->name('getUnreadNotifications');

  /**
   * Agrega una obra a favoritos de los usuarios
   */
  Route::post('/add-favorite-artwork', [UserController::class, 'addFavoriteArtwork'])->name('addFavoriteArtwork');

  /**
   * Elimina una obra de favoritos de los usuarios
   */
  Route::post('/remove-favorite-artwork', [UserController::class, 'removeFavoriteArtwork'])->name('removeFavoriteArtwork');

  /**
   * Devuelve las calificaciones de un usuario
   */
  Route::get('/get-artist-ratings/{id}', [UserController::class, 'getUserRatings'])->name('getUserRatings');
});
