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
   * Devuelve los comentarios de una publicación
   */
  Route::get('/get-comments/{id}', [UserReleaseController::class, 'getComments'])
    ->name('getReleaseComments');

  /**
   * Almacena los datos y crea una nueva publicación
   */
  Route::post('/store', [UserReleaseController::class, 'store'])->name('storeRelease');

  /**
   * Agrega un like a la publicación
   */
  Route::post('/like', [UserReleaseController::class, 'like'])->name('likeRelease');

  /**
   * elimina un like a la publicación
   */
  Route::post('/dislike', [UserReleaseController::class, 'dislike'])->name('dislikeRelease');

  /**
   * Almacena los datos y actualiza una publicación
   */
  Route::put('/update/{id}', [UserReleaseController::class, 'update'])->name('updateRelease');

  /**
   * Elimina una publicación
   */
  Route::delete('/delete/{id}', [UserReleaseController::class, 'destroy'])->name('deleteRelease');

  /**
   * Agrega a favoritos una publicación
   */
  Route::post('/add-favorite', [UserReleaseController::class, 'addFavorite'])->name('addFavoriteRelease');

  /**
   * Agrega a favoritos una publicación
   */
  Route::post('/remove-favorite', [UserReleaseController::class, 'removeFavorite'])->name('removeFavoriteRelease');

  /**
   * Almacena y crea un nuevo comentario
   */
  Route::post('/store-comment', [UserReleaseController::class, 'storeComment'])->name('storeCommentRelease');
});
