<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CollectiveProfile extends Model
{
    protected $table = 'collective_profiles';

    protected $fillable = [
        'collective_id',
        'front_image',
        'profile_image',
    ];

    /**
     * Colectivo perteneciente
     */
    public function collective(): BelongsTo
    {
        return $this->belongsTo(Collective::class);
    }
}
