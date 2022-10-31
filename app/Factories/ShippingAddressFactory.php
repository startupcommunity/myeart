<?php

namespace App\Factories;

use App\Enums\ShippingAddressEnum;
use App\Models\ShippingAddress;

class ShippingAddressFactory
{
  private $address;

  public function __construct(ShippingAddress $address)
  {
    $this->address = $address;
  }

  /**
   * actualizar los registros por default a 0
   *
   * @return boolean
   */
  public function updateDefaultField(): bool
  {
    $user = auth()->user();

    // actualizar los registros por default a 0
    return $user->shippingAddress()->each(function ($address) {
      $address->update(['default' => ShippingAddressEnum::DISABLED]);
    });
  }

  /**
   * Crea una nueva dirección de envió
   *
   * @param array $data
   * @return object|null
   */
  public function save(array $data): ?object
  {
    $user = auth()->user();
    return $user->shippingAddress()->create($data);
  }

  /**
   * actualiza una nueva dirección de envió
   *
   * @param array $data
   * @param int $id
   * @return bool
   */
  public function update(array $data, int $id): bool
  {
    $address = $this->address->findOrFail($id);

    return $address->update($data);
  }
}
