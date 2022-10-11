<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArtworkTechnique extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'artwork_techniques';

    protected $guarded = [];

    public function artwork(): BelongsTo
    {
        return $this->belongsTo(Artwork::class);
    }

    public function technique(): BelongsTo
    {
        return $this->belongsTo(Technique::class);
    }
}
