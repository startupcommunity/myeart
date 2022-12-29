<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

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
     * crear slug
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($col) {
            $col->slug = Str::slug($col->name);
        });
    }

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

    /**
     * Perfil del colectivo
     */
    public function profile(): HasOne
    {
        return $this->hasOne(CollectiveProfile::class);
    }

    /**
     * Devuelve los colectivos a los cuales el usuario pertenece
     */
    public function guests(): HasMany
    {
        return $this->hasMany(GuestCollective::class);
    }

    /**
     * Devuelve los miembros del colectivo, las personas
     * que siguen el colectivo
     */
    public function members(): HasMany
    {
        return $this->hasMany(MemberCollective::class);
    }
}
