<?php

/**
 * Rutas para la gestión de notificaciones
 *
 * @luisandev
 */

use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

/**
 * Marca una notificacion como leída
 */
Route::get('/notifications/mark-as-read/{id}', [NotificationController::class, 'markAsRead'])
  ->name('mark-as-read');

/**
 * Marca todas las notificaciones como leídas
 */
Route::post('/notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])
  ->name('markAllAsReadNotifications');
