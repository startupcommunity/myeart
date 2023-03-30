<?php

/**
 * Gestión de conversaciones entres usuarios
 *
 * @author luisandev <https://luisan.dev>
 */

namespace App\Factories;

use App\Enums\TypeNotificationEnum;
use App\Models\Conversation;
use App\Models\ConversationMessage;
use App\Utils\AppNotification;

class ConversationFactory
{

  public function __construct(private Conversation $chat)
  {
  }

  /**
   * Verificar si dos usuarios tienen una conversación activa
   * caso que no, crea una nueva
   */
  public function check($request): Conversation
  {
    $con_one = $this->chat->where('init_user_id', $request->first_user_id)
      ->where('resp_user_id', $request->second_user_id)
      ->first();

    $con_two = $this->chat->where('init_user_id', $request->second_user_id)
      ->where('resp_user_id', $request->first_user_id)
      ->first();

    // evaluar
    if ($con_one) {
      return $con_one;
    } elseif ($con_two) {
      return $con_two;
    } else {
      return $this->chat->create([
        'init_user_id' => $request->first_user_id,
        'resp_user_id' => $request->second_user_id,
      ]);
    }
  }

  /**
   * Enviar un nuevo mensaje a una conversación
   */
  public function sendMessage($request): ConversationMessage
  {
    $con = $this->chat->find($request->conversation_id);

    if (!$con) {
      throw new Exception('No se encontró la conversación');
    }

    $message = $con->messages()->create([
      'user_id' => $request->user_id,
      'message' => $request->message,
      'is_read' => false
    ]);

    $notifiable_id = $con->init_user_id === $request->user_id ? $con->resp_user_id : $con->init_user_id;

    // una vez que se cree el mensaje se envía una notificacion
    // al receptor del mensaje
    AppNotification::sendNoty([
      'user_id' => $request->user_id,
      'notifiable_id' => $notifiable_id,
      'url' => '/comunidad',
      'msj' => "Te ha dejado un mensaje privado",
      'type' => TypeNotificationEnum::MSJ_PRIVATE // tipo de notificación
    ]);

    return $message;
  }
}
