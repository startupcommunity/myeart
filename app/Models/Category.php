<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'categories';

    /**
     * sub categorías disponibles
     *
     * @return HasMany
     */
    public function subcategories(): HasMany
    {
        return $this->hasMany(SubCategory::class, 'category_id');
    }

    /**
     * 3Er nivel para las subcategorias
     *
     * @return HasMany
     */
    public function subsubcategories(): HasMany
    {
        return $this->hasMany(SubSubCategory::class, 'category_id');
    }
}
