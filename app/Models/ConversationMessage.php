<?php

/**
 * ConversationMessage Modelo de datos para los mensajes de una conversación
 * gestiona los mensajes de una conversación entre usuarios
 *
 * @author luisandev <https://luisan.dev>
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ConversationMessage extends Model
{
    protected $table = 'conversation_messages';
    protected $fillable = [
        'conversation_id',
        'user_id',
        'message',
        'is_read'
    ];

    /**
     * Obtiene la conversación a la que pertenece el mensaje
     *
     * @return BelongsTo
     */
    public function conversation(): BelongsTo
    {
        return $this->belongsTo(Conversation::class);
    }

    /**
     * Obtiene el usuario que envía el mensaje
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
