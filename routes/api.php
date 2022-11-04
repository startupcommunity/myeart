<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\PaisesController;
use App\Http\Controllers\ArtisticActivitysController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShippingAddressController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\SubSubCategoryController;
use App\Http\Controllers\UserInformationsController;

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);

Route::middleware('auth:api')->post('/logout', [LoginController::class, 'logout']);
Route::middleware('auth:api')->get('/paises', [PaisesController::class, 'getAll']);
Route::middleware('auth:api')->get('/artistics', [ArtisticActivitysController::class, 'getAll']);
Route::middleware('auth:api')->put('/registerPerfil', [UserInformationsController::class, 'create']);
Route::middleware('auth:api')->get('/user', function (Request $request) {
    $user = $request->user()->load('profile');
    // $user->perfil = $user->load('perfil');
    return $user;
});

Route::middleware('auth:api')->get('/users', [UserInformationsController::class, 'getAll']);
Route::middleware('auth:api')->get('/user-detail/{id}', [UserInformationsController::class, 'getUser']);
Route::middleware('auth:api')->post('/addOrUpdateUser', [UserInformationsController::class, 'addOrUpdateUser']);
Route::middleware('auth:api')->delete('/deleteUser/{id}', [UserInformationsController::class, 'deleteUser']);

/**
 * grupo de rutas protegidas
 * @luisandev
 */
Route::middleware(['auth:api'])->group(function () {

    // Perfil
    Route::group(['prefix' => 'profile'], function () {
        Route::put('/update-front-photo', [ProfileController::class, 'updateFrontPhoto'])->name('updateFrontPhoto');
        Route::put('/update-profile-photo', [ProfileController::class, 'updateProfilePhoto'])->name('updateProfilePhoto');
        Route::put('/update-profile', [ProfileController::class, 'updateProfile'])->name('updateProfile');
    });

    // obras
    require __DIR__ . '/api/artwork.php';

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

    // dirección de envió
    Route::group(['prefix' => 'shippingAddress'], function () {
        Route::get('/getShippingAddress', [ShippingAddressController::class, 'getUserShippingAddress'])->name('getShippingAddress');
        Route::post('/save', [ShippingAddressController::class, 'save'])->name('saveShippingAddress');
        Route::put('/update/{id}', [ShippingAddressController::class, 'update'])->name('updateShippingAddress');
        Route::delete('/delete/{id}', [ShippingAddressController::class, 'delete'])->name('deleteShippingAddress');
    });
});
