<?php

/**
 * Rutas globales de diferentes módulos
 * con su propio prefijo
 *
 * @luisandev
 */

use App\Http\Controllers\ArtisticActivitysController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\PaisesController;
use Illuminate\Support\Facades\Route;

// general
Route::post('/logout', [LoginController::class, 'logout']);
Route::get('/paises', [PaisesController::class, 'getAll']);
Route::get('/artistics', [ArtisticActivitysController::class, 'getAll']);