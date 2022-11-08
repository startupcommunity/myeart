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
   * Actualizar la galeria de imagenes
   * tanto de la bd como del server
   *
   * @param [type] $newFiles      Las nuevas imagenes a agregar
   * @param [type] $oldFiles      Las imagenes a eliminar
   * @param [type] $artwork
   * @return void
   */
  public function updateGallery($newFiles, $oldFiles, $artwork)
  {
    // eliminar imagenes antiguas
    foreach ($oldFiles as $file) {
      AppStorage::deleteFile(
        $file->picture,
        config('storage.public.artwork_gallery'),
      );

      $file->delete();
    }

    // agregar las nuevas imagenes
    if (!count($newFiles) || !$artwork) {
      return;
    }

    foreach ($newFiles as $key => $file) {
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
   * type => categorías
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
        'title', 'description', 'date_created', 'width', 'large', 'weight', 'location', 'shipping', 'price', 'state'
      ])->toArray();

      // obra creada
      $artwork = $user->artworks()->create($dataArtwork);

      // attach data
      $type = json_decode($data['type']);
      if ($type->category_id) {
        foreach ($type->sub_category as $sub) {
          $artwork->labels()->attach($sub->labels, [
            'category_id' => $type->category_id,
            'sub_category_id' => $sub->id
          ]);
        }
      }

      return $artwork;
    });

    return $artwork;
  }

  /**
   * Actualiza una obra y sus relaciones
   *
   * @param array $data       los datos recibidos
   * @param integer $id       el id de la obra
   * @return object|null
   */
  public function updateSyncArtwork(array $data, int $id): ?object
  {
    $db = DB::transaction(function () use ($data, $id) {

      // datos de obras
      $dataArtwork = collect($data)->only([
        'title', 'description', 'date_created', 'width', 'large', 'weight', 'location', 'shipping', 'price', 'state'
      ])->toArray();

      // obra actualizada
      $artwork = $this->artwork->findOrFail($id);
      $artwork->update($dataArtwork);

      // attach data
      // eliminar o separa por categoría o por etiquetas
      $artwork->categories()->detach();
      $artwork->labels()->detach();
      $type = json_decode($data['type']);

      // si indico alguna categoría
      // se guarda de nuevo
      if ($type->category_id) {
        foreach ($type->sub_category as $sub) {
          $artwork->labels()->attach($sub->labels, [
            'category_id' => $type->category_id,
            'sub_category_id' => $sub->id
          ]);
        }
      }

      // attach data
      // if ($categories) {
      //   foreach ($data['categories'] as $cat) {
      //     $category = json_decode($cat);

      //     // eliminar por categoría o por etiquetas
      //     $artwork->categories()->detach($category->category_id);
      //     $artwork->labels()->detach($category->sub_sub_category_id);

      //     // agregar las nuevas categorías
      //     // siempre y cuando existan etiquetas
      //     if ($category->sub_sub_category_id) {
      //       $artwork->labels()->attach($category->sub_sub_category_id, [
      //         'category_id' => $category->category_id,
      //         'sub_category_id' => $category->sub_category_id
      //       ]);
      //     }
      //   }
      // }

      return $artwork;
    });

    return $db;
  }

  /**
   * Agrega una visita a la obra por medio del usuario logueado
   *
   * @param Request $request
   * @return boolean
   */
  public function addView($request): bool
  {
    $user = auth()->user();
    $data = [
      'user_id' => $user->id,
      'ip' => $request->ip(),
    ];

    $artwork = $this->artwork->findOrFail($request->artwork_id);
    $view = $artwork->views()->create($data);

    return $view ? true : false;
  }
}
