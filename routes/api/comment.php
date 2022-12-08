<?php

use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'comments'], function () {

  /**
   * Devuelve la lista de comentarios de una obra
   */
  Route::get('/artwork-list/{id}', [CommentController::class, 'artworkList'])->name('artworkList');

  /**
   * Agrega una visita a la obra
   */
  Route::post('/artworks/save', [CommentController::class, 'saveCommentArtwork'])->name('saveComment');

  /**
   * Guardar la respuesta de un comentario/pregunta de una obra
   */
  Route::post('/artworks/answer/save', [CommentController::class, 'saveAnswer'])->name('saveAnswer');

  /**
   * agregar un like a un comentario de una publicación
   */
  Route::post('/add-release-like', [CommentController::class, 'addReleaseLike'])->name('addReleaseLike');

  /**
   * eliminar un like a un comentario de una publicación
   */
  Route::post('/delete-release-like', [CommentController::class, 'deleteReleaseLike'])->name('deleteReleaseLike');

  /**
   * agregar una respuesta a un comentario de una publicación
   */
  Route::post('/add-release-answer', [CommentController::class, 'addReleaseAnswer'])->name('addReleaseAnswer');
});
