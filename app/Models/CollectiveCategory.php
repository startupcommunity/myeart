<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CollectiveCategory extends Model
{
    protected $table = 'collective_categories';

    protected $fillable = [
        'collective_id',
        'category_id',
    ];

    /**
     * Colectivo al que pertenece
     */
    public function collective(): BelongsTo
    {
        return $this->belongsTo(Collective::class);
    }

    /**
     * Categoría del colectivo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
