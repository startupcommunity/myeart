<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CollectiveInvitation extends Model
{
    protected $table = 'collective_invitations';

    protected $fillable = [
        'user_id',
        'collective_id',
        'status',
    ];

    /**
     * Usuario invitado
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Colectivo al que se invita
     */
    public function collective(): BelongsTo
    {
        return $this->belongsTo(Collective::class);
    }
}
