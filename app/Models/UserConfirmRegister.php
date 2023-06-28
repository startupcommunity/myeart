<?php

/**
 * Modelo para la tabla user_confirm_registers
 * Gestión de confirmación de registro de usuario
 *
 * @author luisandev <https://luisan.dev>
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserConfirmRegister extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_confirm_registers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'token', // token de confirmación de registro
        'user_id', // id del usuario
        'is_confirm' // si el usuario confirmo el registro
    ];

    /**
     * Get the user that owns the UserConfirmRegister
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
