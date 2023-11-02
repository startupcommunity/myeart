<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OrderItem extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'order_items';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'number',       // int
        'order_id',     // int
        'artwork_id',   // int
        'user_id',      // int
        'title',        // string
        'quantity',     // int
        'price',        // decimal
        'photo',        // string
        'status',       // tinyint '0' => 'pending', '1' => 'shipped', '2' => 'delivered', '3' => 'cancelled
        'event_id'      //int
    ];

    /**
     * Get the order that owns the order item.
     *
     * @return BelongsTo
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the artwork that owns the order item.
     *
     * @return BelongsTo
     */
    public function artwork(): BelongsTo
    {
        return $this->belongsTo(Artwork::class);
    }

    /**
     * Get the event that owns the order item.
     *
     * @return BelongsTo
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(UserEvent::class);
    }

    /**
     * Devuelve el usuario creador de la obra o item
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the messages for the order item.
     * between the Bayer and the seller
     *
     * @return HasMany
     */
    public function messages(): HasMany
    {
        return $this->hasMany(OrderItemMessage::class);
    }
}
