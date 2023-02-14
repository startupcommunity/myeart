<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'contact'], function () {

  /**
   * Envía un mensaje de contacto
   */
  Route::post('/send', [ContactController::class, 'send'])->name('sendMessageContact');
});
