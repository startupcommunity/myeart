<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

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
   * Agrega una obra a favoritos de los usuarios
   */
  Route::post('/add-favorite-artwork', [UserController::class, 'addFavoriteArtwork'])->name('addFavoriteArtwork');

  /**
   * Elimina una obra de favoritos de los usuarios
   */
  Route::post('/remove-favorite-artwork', [UserController::class, 'removeFavoriteArtwork'])->name('removeFavoriteArtwork');
});
