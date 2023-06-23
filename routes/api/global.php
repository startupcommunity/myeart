<?php

/**
 * Rutas globales de diferentes módulos
 * mayormente usado para obtener datos
 * con su propio prefijo
 *
 * @luisandev
 */

use App\Http\Controllers\ArtisticActivitysController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\PaisesController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

// general
Route::post('/logout', [LoginController::class, 'logout']);
Route::get('/paises', [PaisesController::class, 'getAll']);
Route::get('/artistics', [ArtisticActivitysController::class, 'getAll']);

/**
 * Marca una notificacion como leída
 */
Route::get('/notifications/mark-as-read/{id}', [NotificationController::class, 'markAsRead'])->name('mark-as-read');

/**
 * Marca todas las notificaciones como leídas
 */
Route::post('/notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])->name('markAllAsReadNotifications');
