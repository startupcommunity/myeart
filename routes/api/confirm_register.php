<?php

use App\Http\Controllers\ConfirmRegisterController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'confirm-register'], function () {

  /**
   * verifica el token y valida el usuario
   */
  Route::post('/verify-token', [ConfirmRegisterController::class, 'verifyToken'])
    ->name('passwordRegister.verifyToken');
});
