<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FollowCollective extends Model
{
    protected $table = 'follow_collectives';

    protected $fillable = [
        'user_id',
        'collective_id',
    ];

    /**
     * Usuario que sigue
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Colectivo seguido
     */
    public function collective(): BelongsTo
    {
        return $this->belongsTo(Collective::class);
    }
}
