<?php

use App\Http\Controllers\ConversationController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'conversations'], function () {

  /**
   * Verifica si dos usuarios tienen una conversación activa
   * si no la crea
   */
  Route::post('/check', [ConversationController::class, 'check'])
    ->name('checkConversations');

  /**
   * Envía un mensaje a una conversación
   */
  Route::post('/send-message', [ConversationController::class, 'sendMessage'])
    ->name('sendMessageConversations');

  /**
   * Obtiene los mensajes de una conversación
   *
   * @param int $id   Id de la conversación
   */
  Route::get('/get-messages/{id}', [ConversationController::class, 'getMessages'])
    ->name('getMessagesConversations');

  /**
   * Marca todos los mensajes de un usuario como Leidos
   */
  Route::post('/mark-all-as-read', [ConversationController::class, 'markAllAsRead'])
    ->name('markAllAsReadConversations');
});
