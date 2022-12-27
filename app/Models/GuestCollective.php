<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GuestCollective extends Model
{
    protected $table = 'guest_collectives';

    protected $fillable = [
        'collective_id',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function collective(): BelongsTo
    {
        return $this->belongsTo(Collective::class);
    }
}
