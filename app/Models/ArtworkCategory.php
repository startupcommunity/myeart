<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArtworkCategory extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'artwork_categories';

    /**
     * 3Er nivel para las etiquetas
     *
     * @return BelongsTo
     */
    // public function label(): BelongsTo
    // {
    //     return $this->BelongsTo(SubSubCategory::class, 'sub_sub_category_id');
    // }

    // /**
    //  * La sub categoría
    //  *
    //  * @return BelongsTo
    //  */
    // public function subcategory(): BelongsTo
    // {
    //     return $this->BelongsTo(SubCategory::class, 'sub_category_id');
    // }

    // /**
    //  * La categoría principal
    //  *
    //  * @return BelongsTo
    //  */
    // public function category(): BelongsTo
    // {
    //     return $this->BelongsTo(Category::class, 'category_id');
    // }
}
