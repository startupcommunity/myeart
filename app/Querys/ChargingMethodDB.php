<?php

namespace App\Querys;

use App\Models\ChargingMethod;
use Illuminate\Database\Eloquent\Collection;

class ChargingMethodDB
{

  public function __construct(private ChargingMethod $model)
  {
  }

  /**
   * Get the charging method by id.
   *
   * @param int $id     Charging method id
   * @return ChargingMethod
   */
  public function getChargingMethodById(int $id): ChargingMethod
  {
    return $this->model->find($id);
  }

  /**
   * Get the charging method by user id.
   *
   * @param int $id     User id
   * @return Collection
   */
  public function getUserChargingMethods(int $id): Collection
  {
    return $this->model->where('user_id', $id)->get();
  }
}
