<?php

/**
 * Modelo de datos para una conversación entre un usuario y otro
 * gestiona las conversaciones entre usuarios
 *
 * @author luisandev <https://luisan.dev>
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Conversation extends Model
{
    use SoftDeletes;

    protected $table = 'conversations';
    protected $fillable = [
        'init_user_id',         // ID del usuario que inicia la conversación
        'resp_user_id',         // ID del usuario con el que se habla (responde)
        'is_read_init_user',    // Si la conversación ha sido leída por el usuario que inicia la conversación
        'is_read_resp_user',    // Si la conversación ha sido leída por el usuario con el que se habla
    ];

    /**
     * Obtiene el usuario que inicia la conversación
     *
     * @return BelongsTo
     */
    public function initUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'init_user_id');
    }

    /**
     * Obtiene el usuario con el que se habla
     *
     * @return BelongsTo
     */
    public function finalUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'resp_user_id');
    }

    /**
     * Obtiene los mensajes de la conversación
     *
     * @return HasMany
     */
    public function messages(): HasMany
    {
        return $this->hasMany(ConversationMessage::class);
    }
}
