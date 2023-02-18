<?php

/**
 * Rutas de acceso publico sin ningún middleware
 *
 * @luisandev   https://luisan.dev
 */

use App\Http\Controllers\ArtworkController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CollectiveController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserEventController;
use App\Http\Controllers\UserReleaseController;
use Illuminate\Support\Facades\Route;

/**
 * Login y registro
 */
Route::post('/login', [LoginController::class, 'login'])->name('AppLogin');
Route::post('/register', [RegisterController::class, 'register'])->name('AppRegister');

/**
 * Devuelve los comentarios de una publicación a través del slug
 */
Route::get('releases/get-comments-slug/{slug}', [UserReleaseController::class, 'getCommentsSlug'])
  ->name('getReleaseCommentsSlug');

/**
 * Muestra el detalle de un evento
 *
 * @param int|string $id
 */
Route::get('events/show/{id}', [UserEventController::class, 'show'])->name('showEvent');

/**
 * devuelve la info completa de un colectivo
 *
 * @param int|string $id  id del colectivo o slug
 */
Route::get('collectives/get-collective/{id}', [CollectiveController::class, 'getCollective'])->name('getCollective');


/**
 * Con el prefijo guest
 */
Route::group(['prefix' => 'guest'], function () {

  /**
   * devuelve todas las obras publicadas de la app
   */
  Route::get('/artworks/published', [ArtworkController::class, 'getPublish'])->name('getPublishedArtworksGuest');

  /**
   * Devuelve artistas activos de forma random, con un valor máximo
   */
  Route::get('/artists/random', [UserController::class, 'getRandomArtists'])->name('getRandomArtistGuest');

  /**
   * Devuelve las publicaciones de la app
   */
  Route::get('/releases', [UserReleaseController::class, 'getAllReleases'])->name('getAllReleasesGuest');
});

/**
 * Con prefijo contact
 */
Route::group(['prefix' => 'contact'], function () {

  /**
   * Envía un mensaje de contacto
   */
  Route::post('/send', [ContactController::class, 'send'])->name('sendMessageContact');
});

/**
 * con prefijo newsletter
 */
Route::group(['prefix' => 'newsletter'], function () {

  /**
   * Suscribe un usuario a la newsletter
   */
  Route::post('/suscribe', [NewsletterController::class, 'suscribe'])->name('suscribeNewsletter');
});
