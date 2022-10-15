<?php

namespace App\Factories;

use App\Models\Artwork;
use App\Utils\AppStorage;
use Illuminate\Support\Facades\DB;

class ArtworkFactory
{
  private $artwork;

  public function __construct(Artwork $artwork)
  {
    $this->artwork = $artwork;
  }

  /**
   * Almacena en el storage y BD la galeria de obras
   * del usuario 
   *
   * @param array $files        Las imagenes
   * @return void
   */
  public function uploadGalleryFiles($artwork = null, array $files = [])
  {
    if (!count($files) || !$artwork) {
      return;
    }

    foreach ($files as $key => $file) {

      $key += 1;
      $name = 'image-' . $key . '-' . date('Ymdhis');

      $filename = AppStorage::saveFile(
        $file,
        $name,
        config('storage.public.artwork_gallery'),
      );

      if ($filename) {
        $artwork->gallery()->create([
          'picture' => $filename,
          'front_page' => $key == 1 ? 1 : 0,
        ]);
      }
    }
  }

  /**
   * Almacena los datos y relaciones de la obra
   * sync:
   * categories
   * techniques
   * styles
   *
   * @param array $data
   * @return object|null
   */
  public function saveSyncArtwork(array $data): ?object
  {
    $artwork = DB::transaction(function () use ($data) {
      $user = auth()->user();

      // datos de obras
      $dataArtwork = collect($data)->only([
        'title', 'description', 'date_created', 'dimension', 'location', 'shipping', 'price', 'state'
      ])->toArray();

      // datos extra
      $categories = isset($data['categories']) ? $data['categories'] : null;
      $techniques = isset($data['techniques']) ? $data['techniques'] : null;
      $styles = isset($data['styles']) ? $data['styles'] : null;

      // obra creada
      $artwork = $user->artworks()->create($dataArtwork);

      // sync data
      !$categories ?: $artwork->categories()->sync($categories);
      !$styles ?: $artwork->styles()->sync($styles);
      !$techniques ?: $artwork->techniques()->sync($techniques);

      return $artwork;
    });

    return $artwork;
  }
}
