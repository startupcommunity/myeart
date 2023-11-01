<?php

use App\Http\Controllers\UserPasswordResetController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'password-resets'], function () {

  /**
   * Verifica y envía el token al correo indicado
   */
  Route::post('/send-token', [UserPasswordResetController::class, 'sendToken'])
    ->name('passwordReset.sendToken');

  /**
   * Ver tiempo restante del token
   */
  Route::get('/token-remaining-time', [UserPasswordResetController::class, 'tokenRemainingTime'])
    ->name('passwordReset.tokenRemainingTime');

  /**
   * verifica token
   */
  Route::post('/verify-token', [UserPasswordResetController::class, 'verifyToken'])
    ->name('passwordReset.verifyToken');

  /**
   * Cambia la contraseña
   */
  Route::post('/change-password', [UserPasswordResetController::class, 'changePassword'])
    ->name('passwordReset.changePassword');
});
