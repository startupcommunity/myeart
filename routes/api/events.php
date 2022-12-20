<?php

use App\Http\Controllers\UserEventController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'events'], function () {

  /**
   * Crea u nuevo evento
   */
  Route::post('/store', [UserEventController::class, 'store'])->name('eventStore');

  /**
   * Obtiene todos los eventos
   */
  Route::get('/get-all', [UserEventController::class, 'all'])->name('getAllEvents');

  /**
   * agrega a favoritos
   */
  Route::post('/add-favorite', [UserEventController::class, 'addFavorite'])->name('addEventFavorite');

  /**
   * elimina de favoritos
   */
  Route::post('/remove-favorite', [UserEventController::class, 'removeFavorite'])->name('removeEventFavorite');

  /**
   * Agrega un like
   */
  Route::post('/like', [UserEventController::class, 'addLike'])->name('addEventLike');

  /**
   * Elimina un like
   */
  Route::post('/dislike', [UserEventController::class, 'removeLike'])->name('removeEventLike');
});
