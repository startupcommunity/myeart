<?php

namespace App\Factories;

use App\Models\UserEvent;
use App\Utils\AppStorage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EventFactory
{

  /**
   * @param Request $data
   * @return UserEvent
   */
  public function store(Request $data): UserEvent
  {
    $db = DB::transaction(function () use ($data) {
      $user = auth()->user();
      $file = $data->file('image');
      $name = 'picture-' . '-' . date('Ymdhis');
      $path = config('storage.public.event_image');
      $data = $data->only(['name', 'description', 'location', 'init_date', 'init_time', 'mode', 'phone_number']);

      // primero se debe guardar la imagen
      $filename = AppStorage::saveFile($file, $name, $path);
      $data['image'] = $filename;

      // luego se guarda el evento
      return $user->events()->create($data);
    });


    return $db;
  }
}
