<?php

use App\Http\Controllers\ArtworkController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'artworks'], function () {

  /**
   * devuelve todas las obras de un usuario logueado
   */
  Route::get('/', [ArtworkController::class, 'getArtworks'])->name('getArtworks');

  /**
   * Devuelve las obras publicadas del usuario logueado
   */
  Route::get('/publish', [ArtworkController::class, 'getPublish'])->name('getAllArtworks');

  /**
   * @param Int $id   id del usuario
   * @param Int|null  $artworkID   id de la obra a ignorar (opcional)
   */
  Route::get('/user/publish/{id}/{artworkID?}', [ArtworkController::class, 'getUserPublish'])->name('getUserPublishArtworks');

  /**
   * @param Int $category_id      id de la categoría a filtrar
   * @param Int $user_id          id del usuario con obras a ignorar
   */
  Route::get('/publish/category/{category_id}/{user_id?}', [ArtworkController::class, 'getPublishForCategory'])->name('getPublishForCategory');

  /**
   * Devuelve la imagen de la obra
   */
  Route::get('/image/{id}', [ArtworkController::class, 'getImage'])->name('getImage');

  /**
   * Obtiene una obra por su id
   * PD: no se porque le coloque edit ???
   */
  Route::get('/edit/{id}', [ArtworkController::class, 'editArtworks'])->name('editArtworks');

  /**
   * Obtiene una obra por su id con sus relaciones
   */
  Route::get('/show/{id}', [ArtworkController::class, 'show'])->name('showArtworks');

  /**
   * Obtiene una obra por su slug
   */
  Route::get('/slug/{slug}', [ArtworkController::class, 'slug'])->name('showSlugArtworks');

  /**
   * filtra las obras publicadas por parámetros indicados
   */
  Route::post('/filterPublished', [ArtworkController::class, 'filterArtworksPublished'])->name('filterArtworksPublished');

  /**
   * Guarda una obra
   * PD: debería decir save
   */
  Route::post('/create', [ArtworkController::class, 'save'])->name('saveArtwork');

  /**
   * Agrega una visita a la obra
   */
  Route::post('/addvisit', [ArtworkController::class, 'addView'])->name('addView');

  /**
   * Liked una obra, es decir, la marca con un me gusta
   * @param int $id   id de la obra
   */
  Route::post('/liked/{id}', [ArtworkController::class, 'liked'])->name('likedArtworks');

  /**
   * dislike a una obra, quita el me gusta
   * @param int $id   id de la obra
   */
  Route::post('/disliked/{id}', [ArtworkController::class, 'disliked'])->name('dislikedArtworks');

  /**
   * Actualiza los datos de una obra
   */
  Route::put('/update/{id}', [ArtworkController::class, 'update'])->name('update');

  /**
   * Elimina una obra por su id
   */
  Route::delete('/delete/{id}', [ArtworkController::class, 'deleteArtworks'])->name('deleteArtworks');
});
