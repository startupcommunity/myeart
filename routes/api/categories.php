<?php

/**
 * Rutas para gestión categorias y sub categorias
 *
 * @luisandev https://luisan.dev
 */

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\SubSubCategoryController;
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
