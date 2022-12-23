<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Collective extends Model
{
    use SoftDeletes;

    protected $table = 'collectives';

    protected $fillable = [
        'user_id',
        'name',
        'type',
        'location',
        'description',
    ];

    /**
     * Usuario perteneciente
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Categorías del colectivo
     */
    public function categories(): HasMany
    {
        return $this->hasMany(CollectiveCategory::class);
    }
}
