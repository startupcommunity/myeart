<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\PaisesController;
use App\Http\Controllers\ArtisticActivitysController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\SubSubCategoryController;

// sin middleware
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);

// auth:api
Route::middleware('auth:api')->post('/logout', [LoginController::class, 'logout']);
Route::middleware('auth:api')->get('/paises', [PaisesController::class, 'getAll']);
Route::middleware('auth:api')->get('/artistics', [ArtisticActivitysController::class, 'getAll']);

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

    // categorías
    Route::group(['prefix' => 'categories'], function () {
        Route::get('/', [CategoryController::class, 'getCategories'])->name('getCategories');
    });

    // subcategorias
    Route::group(['prefix' => 'subcategories'], function () {

        /**
         * @param id id de la categoría que pertenece
         */
        Route::get('/{id}', [SubCategoryController::class, 'getSubcategories'])->name('getSubcategories');
    });

    // etiquetas o sub sub categorías
    Route::group(['prefix' => 'labels'], function () {

        /**
         * @param category_id id de la categoría que pertenece
         * @param sub_category_id id de la categoría que pertenece
         */
        Route::get('/{category_id}/{sub_category_id}', [SubSubCategoryController::class, 'getLabels'])->name('getLabels');
    });
});
