<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\PaisesController;
use App\Http\Controllers\ArtisticActivitysController;
use App\Http\Controllers\ArtworkController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StyleController;
use App\Http\Controllers\TechniqueController;
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
    Route::group(['prefix' => 'artworks'], function () {
        Route::get('/', [ArtworkController::class, 'getArtworks'])->name('getArtworks');
        Route::get('/publish', [ArtworkController::class, 'getPublish'])->name('getAllArtworks');
        Route::get('/image/{id}', [ArtworkController::class, 'getImage'])->name('getImage');
        Route::get('/edit/{id}', [ArtworkController::class, 'editArtworks'])->name('editArtworks');
        Route::delete('/delete/{id}', [ArtworkController::class, 'deleteArtworks'])->name('deleteArtworks');
        Route::post('/create', [ArtworkController::class, 'save'])->name('saveArtwork');
        Route::put('/update/{id}', [ArtworkController::class, 'update'])->name('update');
    });

    // categorías
    Route::group(['prefix' => 'categories'], function () {
        Route::get('/', [CategoryController::class, 'getCategories'])->name('getCategories');
    });

    // estilos
    Route::group(['prefix' => 'styles'], function () {
        Route::get('/', [StyleController::class, 'getStyles'])->name('getStyles');
    });

    // Técnicas
    Route::group(['prefix' => 'techniques'], function () {
        Route::get('/', [TechniqueController::class, 'getTechniques'])->name('getTechniques');
    });
});
