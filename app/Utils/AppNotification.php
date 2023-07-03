<?php

/**
 * Gestión de envió y recibo de notificaciones
 *
 * @author Luis Annunziato <https://luisan.dev>
 */

namespace App\Utils;

use App\Events\NotificationEvent;

class AppNotification
{
  /**
   * Enviar una notificacion
   *
   * @param array $data     Datos de la notificacion
   * @return string
   */
  public static function sendNoty(array $data)
  {
    $userID = $data['user_id'] ?? auth()->user()->id;
    $notifiableID = $data['notifiable_id'] ?? auth()->user()->id;
    $url = $data['url'] ?? '/';
    $msj = $data['msj'] ?? 'Nueva Notificación';
    $type = $data['type'] ?? 0;
    $chat = $data['chat_id'] ?? null;

    $noty = [
      'user_id' => $userID,                         // usuario que envía la notificacion
      'notifiable_id' => $notifiableID,             // usuario que recibe la notificacion
      'url' => $url,                                // url de la notificacion
      'message' => $msj,                            // mensaje de la notificacion
      'type' => $type,                              // tipo de notificacion
      'chat_id' => $chat,                           // id de la conversación (chat - opcional)
    ];

    event(new NotificationEvent($noty));
  }
}
