<?php

/**
 * Rutas de acceso publico sin ningún middleware
 *
 * @luisandev
 */

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CollectiveController;
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
