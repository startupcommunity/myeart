<?php

use Illuminate\Support\Facades\Route;

// sin restricción de acceso
require __DIR__ . '/api/public.php';

/**
 * grupo de rutas protegidas
 *
 * @luisandev https://luisan.dev
 */
Route::middleware(['auth:api'])->group(function () {

    // globales
    require __DIR__ . '/api/global.php';
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
    // métodos de pago
    require __DIR__ . '/api/payment_methods.php';
    // métodos de cobro
    require __DIR__ . '/api/charging_methods.php';
    // contacto
    require __DIR__ . '/api/contact.php';
    // newsletter
    require __DIR__ . '/api/newsletter.php';
    // conversations
    require __DIR__ . '/api/conversations.php';
    // notifications
    require __DIR__ . '/api/notifications.php';
    // pagos
    require __DIR__ . '/api/payouts.php';
});
