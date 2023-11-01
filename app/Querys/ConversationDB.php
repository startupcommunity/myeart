<?php

namespace App\Querys;

use App\Models\Conversation;
use App\Models\ConversationMessage;
use Illuminate\Database\Eloquent\Collection;

class ConversationDB
{
  public function __construct(
    private Conversation $model
  ) {
  }

  /**
   * Devuelve los mensajes de una conversación
   *
   * @param int $id   id de la conversación
   */
  public function getMessages(int $id): Collection
  {
    $messages = ConversationMessage::where('conversation_id', $id)
      ->with('user')
      ->get();

    return $messages;
  }
}
