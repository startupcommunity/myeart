<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class UserEvent extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_events';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'name',
        'image',
        'mode',
        'init_date', // date
        'init_time', // time
        'location',
        'phone_number',
        'description',
        'slug'
    ];

    // crear slug al momento de guardar
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($event) {
            $event->slug = Str::slug($event->name);
        });
    }

    /**
     * El usuario creador
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Devuelve los likes del evento
     *
     * @return HasMany
     */
    public function likes(): HasMany
    {
        return $this->hasMany(EventLike::class, 'event_id');
    }

    /**
     * Verifica si un evento aun esta vigente
     * por su fecha y hora de inicio
     *
     * @return bool
     */
    public function isCurrent(): bool
    {
        return $this->init_date >= now()->toDateString();
    }

    // ------------- scopes ---------------

    /**
     * Devuelve los eventos aun vigentes
     *
     * @param  Builder $query
     * @return Builder
     */
    public function scopeCurrent($query)
    {
        return $query->where('init_date', '>=', now()->toDateString());
    }

    /**
     * Devuelve los eventos que ya caducaron
     *
     * @param  Builder $query
     * @return Builder
     */
    public function scopeExpired($query)
    {
        return $query->where('init_date', '<', now()->toDateString());
    }
}
