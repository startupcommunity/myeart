<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
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
        return $this->belongsToMany(Category::class, 'artwork_categories')->withPivot(['sub_category_id', 'sub_sub_category_id']);
    }

    /**
     * devuelve las etiquetas relacionadas a una categoría y a una subcategoria
     *
     * @return BelongsToMany
     */
    public function labels(): BelongsToMany
    {
        return $this->belongsToMany(SubSubCategory::class, 'artwork_categories', 'artwork_id', 'sub_sub_category_id');
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
     * @param  Builder $query
     * @param  String $weight
     * @return Builder
     */
    public function scopeWeight($query, $weight = null)
    {
        if (!$weight) return $query;
        return $query->whereBetween('weight', [0, $weight]);
    }

    /**
     * Devuelve la query filtrada por el ancho de la obra
     *
     * @param  Builder $query
     * @param  String $width
     * @return Builder
     */
    public function scopeWidth($query, $width = null)
    {
        if (!$width) return $query;
        return $query->whereBetween('width', [0, $width]);
    }

    /**
     * Devuelve la query filtrada por el largo de la obra
     *
     * @param  Builder $query
     * @param  String $large
     * @return Builder
     */
    public function scopeLarge($query, $large = null)
    {
        if (!$large) return $query;
        return $query->whereBetween('large', [0, $large]);
    }

    /**
     * Devuelve la query filtrada por el precio de la obra
     *
     * @param  Builder $query
     * @param  String $large
     * @return Builder
     */
    public function scopePrice($query, $price = null)
    {
        if (!$price) return $query;
        return $query->whereBetween('price', [0, $price]);
    }

    /**
     * Devuelve la obra filtrada por la categoría
     *
     * @param  Integer $category_id     id de la categoría
     * @param  Integer $sub_cat_id      id de la sub categoría
     * @param  Integer $label_id        id de la etiqueta
     * @param  Builder $query
     * @return Builder
     */
    public function scopeCategory(
        $query,
        $category_id = null,
        $sub_cat_id = null,
        $label_id = null
    ) {
        if (!$category_id) return $query;
        return $query->whereHas('categories', function ($cat) use (
            $category_id,
            $sub_cat_id,
            $label_id
        ) {

            if ($category_id) {
                $cat->where('category_id', $category_id);
            }

            if ($sub_cat_id) {
                $cat->where('sub_category_id', $sub_cat_id);
            }

            if ($label_id) {
                $cat->where('sub_sub_category_id', $label_id);
            }
        });
    }

    /**
     * Devuelve la obra ordenada por opciones
     * 1 - mas reciente
     * 2 - destacada
     * 2 - precio
     *
     * @param  Integer $sortby     tipo de orden
     * @param  Builder $query
     * @return Builder
     */
    public function scopeSortByOption($query, $sortBy = null)
    {
        if (!$sortBy) return $query;

        if ($sortBy === 1) {
            return $query->orderByDesc('id');
        }

        if ($sortBy === 2) {
            return $query->withCount('likes')->orderByDesc('likes_count');
        }

        if ($sortBy === 3) {
            return $query->orderByDesc('price');
        }
    }
}
