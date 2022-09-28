<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\PaisesController;
use App\Http\Controllers\ArtisticActivitysController;
use App\Http\Controllers\UserInformationsController;
use App\Models\User;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);

Route::middleware('auth:api')->post('/logout', [LoginController::class, 'logout']);
Route::middleware('auth:api')->get('/paises', [PaisesController::class, 'getAll']);
Route::middleware('auth:api')->get('/artistics', [ArtisticActivitysController::class, 'getAll']);
Route::middleware('auth:api')->put('/registerPerfil', [UserInformationsController::class, 'create']);
Route::middleware('auth:api')->get('/user', function (Request $request) {
    $user = $request->user();
    $user->perfil = $user->perfil();
    return $user;
});

Route::middleware('auth:api')->get('/users', [UserInformationsController::class, 'getAll']);
Route::middleware('auth:api')->get('/user-detail/{id}', [UserInformationsController::class, 'getUser']);
Route::middleware('auth:api')->post('/addOrUpdateUser', [UserInformationsController::class, 'addOrUpdateUser']);
Route::middleware('auth:api')->delete('/deleteUser/{id}', [UserInformationsController::class, 'deleteUser']);