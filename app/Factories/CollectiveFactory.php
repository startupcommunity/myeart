<?php

namespace App\Factories;

use App\Models\Collective;
use Illuminate\Http\Request;

class CollectiveFactory
{
  /**
   * Crea un nuevo colectivo para el usuario autenticado
   */
  public function store(Request $request): ?Collective
  {
    $user = auth()->user();

    $data = [
      'name' => $request->name,
      'category' => $request->category,
      'description' => $request->description,
    ];

    return $user->collectives()->create($data);
  }
}
