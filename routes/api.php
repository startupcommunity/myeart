<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\UserEventController;
use App\Http\Controllers\UserReleaseController;

// sin middleware
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);

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
 * grupo de rutas protegidas
 * @luisandev
 */
Route::middleware(['auth:api'])->group(function () {

    // user
    require __DIR__ . '/api/user.php';

    // perfil
    require __DIR__ . '/api/profile.php';

    // obras
    require __DIR__ . '/api/artwork.php';

    // direcciones de envió
    require __DIR__ . '/api/shipping_address.php';

    // comentarios / preguntas
    require __DIR__ . '/api/comment.php';

    // publicaciones
    require __DIR__ . '/api/release.php';

    // carrito de compras
    require __DIR__ . '/api/shopping_cart.php';

    // ordenes
    require __DIR__ . '/api/orders.php';

    // eventos
    require __DIR__ . '/api/events.php';

    // colectivos
    require __DIR__ . '/api/collectives.php';

    // globales
    require __DIR__ . '/api/global.php';
});
