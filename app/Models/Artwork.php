<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
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
     * NOTA: Mover a un observer
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($artwork) {
            $artwork->slug = Str::slug($artwork->title);
        });
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

    /**
     * Devuelve los likes de una obra
     *
     * @return HasMany
     */
    public function likes(): HasMany
    {
        return $this->hasMany(ArtworkLike::class);
    }

    // -------------------------
    // ----- local scopes ------
    // -------------------------

    /**
     * Devuelve la query filtrada por el peso de la obra
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @param  String $weight
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWeight($query, $weight)
    {
        return $query->where('weight', $weight);
    }

    /**
     * Devuelve la query filtrada por el ancho de la obra
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @param  String $width
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWidth($query, $width)
    {
        return $query->where('width', $width);
    }

    /**
     * Devuelve la query filtrada por el largo de la obra
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @param  String $large
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLarge($query, $large)
    {
        return $query->where('large', $large);
    }
}
