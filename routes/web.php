<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::get('{any}', fn () => view('app'))->where('any', '.*');

// ruta para descargar certificado de mis pedidos - pdf

Route::middleware(['auth:api'])->group(function () {
    Route::get('orders/download-pdf/{id}', [OrderController::class, 'downloadPdf'])
        ->name('order.downloadPdf');
});

// ruta para indicar la url de la pagina de verificación de registro
Route::get(
    '/confirm-register-email/{token}',
    fn () => redirect(env('APP_URL') . 'confirm-register-email/' . request()->token)
)->name('confirmRegisterEmail');
