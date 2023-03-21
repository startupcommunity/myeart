<?php

/**
 * Gestión de tipos para las notificaciones
 *
 * @author Luis Annunziato <https://luisan.dev>
 */

namespace App\Enums;

final class TypeNotificationEnum
{
  const QUESTION = 1;
  const COMMENT = 2;
  const ANSWER = 3;
  const FOLLOW = 4;
  const BUY = 5;
  const LIKE_ARTWORK = 6;
  const LIKE_RELEASE = 7;
  const LIKE_QUESTION = 8;
  const LIKE_COLLECTIVE = 9;
  const LIKE_COMMENT = 10;
  const LIKE_ANSWER = 11;
  const LIKE_ARTIST = 12;
  const INVITATION_COLLECTIVE = 13;
  const DECLINE_INVITATION_COLLECTIVE = 14;
  const ACCEPT_INVITATION_COLLECTIVE = 15;
  const UNFOLLOW = 16;
  const ITEM_DELIVERED = 17;
  const TAGGED = 18;
  const LIKE_EVENT = 19;
  const MSJ_CONTACT_ORDER_ITEM = 20;

  public static function getValues(): array
  {
    return [
      self::QUESTION,
      self::COMMENT,
      self::ANSWER,
      self::FOLLOW,
      self::BUY,
      self::LIKE_ARTWORK,
      self::LIKE_RELEASE,
      self::LIKE_QUESTION,
      self::LIKE_COLLECTIVE,
      self::LIKE_COMMENT,
      self::LIKE_ANSWER,
      self::LIKE_ARTIST,
      self::INVITATION_COLLECTIVE,
      self::DECLINE_INVITATION_COLLECTIVE,
      self::ACCEPT_INVITATION_COLLECTIVE,
      self::UNFOLLOW,
      self::ITEM_DELIVERED,
      self::TAGGED,
      self::LIKE_EVENT,
      self::MSJ_CONTACT_ORDER_ITEM,
    ];
  }

  public static function getLabels(): array
  {
    return [
      self::QUESTION => 'Pregunta',
      self::COMMENT => 'Comentario',
      self::ANSWER => 'Respuesta',
      self::FOLLOW => 'Seguir',
      self::BUY => 'Compra',
      self::LIKE_ARTWORK => 'Me gusta obra',
      self::LIKE_RELEASE => 'Me gusta publicación',
      self::LIKE_QUESTION => 'Me gusta pregunta',
      self::LIKE_COLLECTIVE => 'Me gusta colectivo',
      self::LIKE_COMMENT => 'Me gusta comentario',
      self::LIKE_ANSWER => 'Me gusta respuesta',
      self::LIKE_ARTIST => 'Me gusta artista',
      self::INVITATION_COLLECTIVE => 'Invitación a colectivo',
      self::DECLINE_INVITATION_COLLECTIVE => 'Rechazo invitación a colectivo',
      self::ACCEPT_INVITATION_COLLECTIVE => 'Acepto invitación a colectivo',
      self::UNFOLLOW => 'Dejar de seguir',
      self::ITEM_DELIVERED => 'Artículo entregado',
      self::TAGGED => 'Etiquetado',
      self::LIKE_EVENT => 'Me gusta evento',
      self::MSJ_CONTACT_ORDER_ITEM => 'Mensaje entre vendedor y comprador de artículo',
    ];
  }
}
