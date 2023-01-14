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
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PaisesController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\SubSubCategoryController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

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
