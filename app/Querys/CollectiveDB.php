<?php

namespace App\Querys;

use App\Models\Collective;

class CollectiveDB
{
  public function __construct(private Collective $model)
  {
  }

  /**
   * devuelve un colectivo
   *
   * @param int $id
   * @return Collective
   */
  public function getCollective(int $id): Collective
  {
    return $this->model->with(['categories.category', 'profile'])->findOrFail($id);
  }
}
