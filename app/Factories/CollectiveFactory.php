<?php

namespace App\Factories;

use App\Models\Collective;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CollectiveFactory
{
  /**
   * Crea un nuevo colectivo para el usuario autenticado
   */
  public function store(Request $request): ?Collective
  {
    $tran = DB::transaction(function () use ($request) {
      $user = auth()->user();

      $data = $request->only([
        'name',
        'type',
        'location',
        'description',
      ]);

      // convertir categorias en array valido para createMany
      $request->categories = array_map(function ($item) {
        return ['category_id' => $item];
      }, $request->categories);

      $collective =  $user->collectives()->create($data);

      if ($collective) {
        $collective->categories()->createMany($request->categories);
      }

      return $collective;
    });

    return $tran;
  }
}
