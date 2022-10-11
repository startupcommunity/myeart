<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Artwork extends Model
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'artworks';

    protected $guarded = [];

    /**
     * devuelve la categoría relacionada
     *
     * @return BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Devuelve el usuario perteneciente
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Devuelve los estilos asignados
     *
     * @return BelongsToMany
     */
    public function styles(): BelongsToMany
    {
        return $this->belongsToMany(Style::class, 'artwork_styles', 'style_id', 'artwork_id');
    }

    /**
     * Devuelve las técnicas asignadas
     *
     * @return BelongsToMany
     */
    public function techniques(): BelongsToMany
    {
        return $this->belongsToMany(Technique::class, 'artwork_techniques', 'technique_id', 'artwork_id');
    }

    /**
     * Devuelve la galeria de fotos d la obra
     *
     * @return HasMany
     */
    public function galery(): HasMany
    {
        return $this->hasMany(Galery::class);
    }
}
