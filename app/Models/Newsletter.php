<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Newsletter extends Model
{
    protected $table = 'newsletters';

    protected $fillable = [
        'user_id',          // ID del usuario
        'email',            // Email del usuario
    ];

    /**
     * Obtiene el usuario al que pertenece la suscripción
     *
     * @return void
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
