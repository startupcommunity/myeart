<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::get('{any}', fn () => view('app'))->where('any', '.*');

// ruta para descargar certificado de mis pedidos - pdf

Route::middleware(['auth:api'])->group(function () {
    Route::get('orders/download-pdf/{id}', [OrderController::class, 'downloadPdf'])
        ->name('order.downloadPdf');
});
