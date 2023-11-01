<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MemberCollective extends Model
{
    protected $table = 'member_collectives';

    protected $fillable = [
        'user_id',
        'collective_id',
    ];

    /**
     * Usuario perteneciente
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Colectivo perteneciente
     */
    public function collective(): BelongsTo
    {
        return $this->belongsTo(Collective::class);
    }
}
