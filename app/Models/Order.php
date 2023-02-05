<?php

namespace App\Models;

use App\Enums\ItemStatusEnum;
use App\Enums\OrderStatusEnum;
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
        'user_id',  // int
        'subtotal', // decimal
        'tax',      // decimal
        'shipping', // decimal
        'total',    // decimal
        'status'    // tinyint
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

    /**
     * Verificar si todos los items fueron cancelados
     *
     * @return bool
     */
    public function allItemsCanceled(): bool
    {
        $totalItems = $this->items()->count();
        $cancelledItems = $this->items()->get()->filter(
            fn ($item) => $item->status === ItemStatusEnum::CANCELED
        )->count();

        return $cancelledItems === $totalItems;
    }

    /**
     * Verifica si todas los items fueron aprobados
     *
     * @return bool
     */
    public function allItemsApproved(): bool
    {
        $totalItems = $this->items()->count();
        $approvedItems = $this->items()->get()->filter(
            fn ($item) => $item->status === ItemStatusEnum::DELIVERED
        )->count();

        return $approvedItems === $totalItems;
    }

    /**
     * Verifica si la orden fue cancelada
     *
     * @return bool
     */
    public function isCanceled(): bool
    {
        return $this->status === OrderStatusEnum::CANCELED;
    }

    /**
     * Verifica si la orden fue aprobada
     *
     * @return bool
     */
    public function isApproved(): bool
    {
        return $this->status === OrderStatusEnum::DELIVERED;
    }

    /**
     * Verifica si la orden la esta consultando el
     * usuario creador
     *
     * @param int|null $user_id         Id del usuario
     * @return bool
     */
    public function isOwner(?int $user_id): bool
    {
        $userID = $user_id ?? auth()->id();
        return $this->user_id === $userID;
    }
}
