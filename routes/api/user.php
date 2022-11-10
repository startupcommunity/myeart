<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'user'], function () {

  /**
   * Sigue a un artista indicado por request
   */
  Route::post('/follow-artist', [UserController::class, 'followArtist'])->name('followArtist');

  /**
   * Devuelve los artistas seguidos por el usuario logueado
   */
  Route::get('/get-follow-artists', [UserController::class, 'getFollowArtists'])->name('getFollowArtists');
});
