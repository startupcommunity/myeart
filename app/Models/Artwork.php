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
        return $this->belongsToMany(Style::class, 'artwork_styles');
    }

    /**
     * Devuelve las técnicas asignadas
     *
     * @return BelongsToMany
     */
    public function techniques(): BelongsToMany
    {
        return $this->belongsToMany(Technique::class, 'artwork_techniques');
    }

    /**
     * devuelve las categorías relacionadas
     *
     * @return BelongsToMany
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'artwork_categories');
    }

    /**
     * Devuelve la galeria de fotos d la obra
     *
     * @return HasMany
     */
    public function gallery(): HasMany
    {
        return $this->hasMany(Gallery::class);
    }
}
