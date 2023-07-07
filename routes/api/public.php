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
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\PaisesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserEventController;
use App\Http\Controllers\UserReleaseController;
use Illuminate\Support\Facades\Route;

// recuperar contraseña
require __DIR__ . '/password_reset.php';

// categorias y sub categorias
require __DIR__ . '/categories.php';

// confirm register
require __DIR__ . '/confirm_register.php';

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
Route::get('collectives/get-collective/{id}', [CollectiveController::class, 'getCollective'])
  ->name('getCollective');

// devuelve todos los paises
Route::get('/paises', [PaisesController::class, 'getAll']);

/**
 * Con prefijo contact
 */
Route::group(['prefix' => 'contact'], function () {

  // Envía un mensaje de contacto
  Route::post('/send', [ContactController::class, 'send'])->name('sendMessageContact');
});

/**
 * con prefijo newsletter
 */
Route::group(['prefix' => 'newsletter'], function () {

  // Suscribe un usuario a la newsletter
  Route::post('/suscribe', [NewsletterController::class, 'suscribe'])->name('suscribeNewsletter');
});

/**
 * endpoints que no requieren autenticación
 * Con el prefijo guest
 */
Route::group(['prefix' => 'guest'], function () {

  /**
   * devuelve todas las obras publicadas de la app
   */
  Route::get('/artworks/published', [ArtworkController::class, 'getPublish'])
    ->name('getPublishedArtworksGuest');

  /**
   * Devuelve artistas activos de forma random, con un valor máximo
   */
  Route::get('/artists/random', [UserController::class, 'getRandomArtists'])
    ->name('getRandomArtistGuest');

  /**
   * Devuelve las publicaciones de la app
   */
  Route::get('/releases', [UserReleaseController::class, 'getAllReleases'])
    ->name('getAllReleasesGuest');

  /**
   * Devuelve las obras publicas filtradas
   */
  Route::post('/artworks/filterPublished', [ArtworkController::class, 'filterArtworksPublished'])
    ->name('guestFilterArtworksPublished');

  /**
   * Devuelve todos los artistas de la app, excluyendo el usuario logueado y los eliminados
   * paginados
   */
  Route::get('/artists/get-artists', [UserController::class, 'getArtists'])
    ->name('getGuestArtists');

  /**
   * Obtiene todos los eventos
   */
  Route::get('/events/get-all', [UserEventController::class, 'all'])
    ->name('getGuestAllEvents');

  /**
   * Devuelve todas las publicaciones de los usuarios
   */
  Route::get('/releases/get-artists-releases', [UserReleaseController::class, 'getReleaseFollowArtists'])
    ->name('getGuestReleaseFollowArtists');

  /**
   * Devuelve todos los colectivos
   * filtrados por request y paginados
   */
  Route::get('/collectives/get-all', [CollectiveController::class, 'getAllCollectives'])
    ->name('getGuestAllCollectives');

  /**
   * Devuelve un usuario artista con sus respectivas relaciones
   */
  Route::get('/user/get-artist/{id}', [UserController::class, 'getArtist'])
    ->name('getGuestArtist');

  /**
   * Obtiene los eventos de un usuario
   */
  Route::get('/events/get-user-events/{id}', [UserEventController::class, 'getUserEvents'])
    ->name('getGuestUserEvents');

  /**
   * Devuelve las calificaciones de un usuario
   */
  Route::get('/user/get-artist-ratings/{id}', [UserController::class, 'getUserRatings'])
    ->name('getGuestUserRatings');

  /**
   * Devuelve todas las publicaciones del un usuario
   */
  Route::get('/releases/get-user-releases/{id?}', [UserReleaseController::class, 'getUserRelease'])
    ->name('getGuestUserRelease');

  /**
   * @param Int $id   id del usuario
   * @param Int|null  $artworkID   id de la obra a ignorar (opcional)
   */
  Route::get('/artworks/user/publish/{id}/{artworkID?}', [ArtworkController::class, 'getUserPublish'])
    ->name('getGuestUserPublishArtworks');

  /**
   * Obtiene una obra por su id con sus relaciones
   */
  Route::get('/artworks/show/{id}', [ArtworkController::class, 'show'])
    ->name('showGuestArtworks');

  /**
   * Devuelve la imagen de la obra
   */
  Route::get('/artworks/image/{id}', [ArtworkController::class, 'getImage'])
    ->name('getGuestImage');

  /**
   * Agrega una visita a la obra
   */
  Route::post('/artworks/addvisit', [ArtworkController::class, 'addView'])
    ->name('addGuestView');

  /**
   * Devuelve otras obras publicadas
   * @param Int $category_id      id de la categoría a filtrar
   * @param Int $user_id          id del usuario con obras a ignorar
   */
  Route::get('/artworks/publish/category/{category_id}/{user_id?}', [ArtworkController::class, 'getPublishForCategory'])
    ->name('getGuestPublishForCategory');

  /**
   * Devuelve la lista de comentarios de una obra
   */
  Route::get('/comments/artwork-list/{id}', [CommentController::class, 'artworkList'])
    ->name('artworkGuestList');

  /**
   * Devuelve los comentarios de una publicación
   */
  Route::get('/releases/get-comments/{id}', [UserReleaseController::class, 'getComments'])
    ->name('getGuestReleaseComments');
});
