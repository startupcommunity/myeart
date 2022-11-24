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
   * Devuelve todos los artistas de la app, excluyendo el usuario logueado y los eliminados
   */
  Route::get('/get-artists', [UserController::class, 'getArtists'])->name('getArtists');

  /**
   * Devuelve un usuario artista con sus respectivas relaciones
   */
  Route::get('/get-artist/{id}', [UserController::class, 'getArtist'])->name('getArtist');
});
