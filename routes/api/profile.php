<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'profile'], function () {

  /**
   * Actualiza la foto de portada
   */
  Route::put('/update-front-photo', [ProfileController::class, 'updateFrontPhoto'])->name('updateFrontPhoto');

  /**
   * Actualiza la foto de perfil
   */
  Route::put('/update-profile-photo', [ProfileController::class, 'updateProfilePhoto'])->name('updateProfilePhoto');

  /**
   * Actualiza los datos del usuario y del perfil
   */
  Route::put('/update-profile', [ProfileController::class, 'updateProfile'])->name('updateProfile');
});
