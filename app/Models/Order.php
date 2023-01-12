<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'orders';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'subtotal',
        'tax',
        'shipping',
        'total',
        'status'
    ];

    /**
     * Get the user that owns the order.
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the order address that owns the order.
     *
     * @return BelongsTo
     */
    public function shippingAddress(): ?HasOne
    {
        return $this->hasOne(OrderAddress::class, 'order_id');
    }

    /**
     * Get the order items for the order.
     *
     * @return HasMany
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }

    /**
     * Get the order items for the order.
     *
     * @return ?HasOne
     */
    public function payment(): ?HasOne
    {
        return $this->hasOne(OrderPayment::class, 'order_id');
    }

    /**
     * Obtiene el tipo de envío para el pedido.
     *
     * @return ?HasOne
     */
    public function shippingMethod(): ?HasOne
    {
        return $this->hasOne(ShippingMethod::class, 'order_id');
    }

    /**
     * Devuelve el rating que se le ha dado a la orden
     */
    public function rating(): ?HasOne
    {
        return $this->hasOne(RatingOrder::class);
    }
}
