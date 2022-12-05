<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserInformationsController;
use Illuminate\Support\Facades\Route;

Route::get('/user', [UserInformationsController::class, 'getAuthUser']);
Route::put('/registerPerfil', [UserInformationsController::class, 'create']);
Route::get('/users', [UserInformationsController::class, 'getAll']);
Route::get('/user-detail/{id}', [UserInformationsController::class, 'getUser']);
Route::post('/addOrUpdateUser', [UserInformationsController::class, 'addOrUpdateUser']);
Route::delete('/deleteUser/{id}', [UserInformationsController::class, 'deleteUser']);

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
