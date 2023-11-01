<?php

namespace App\Utils;

use Illuminate\Support\Facades\Storage;

class AppStorage
{

  /**
   * Guarda un archivo en el sistema de archivos de la app
   *
   * @param File $file      Archivo a almacenar
   * @param String $name    nombre opcional para el archivo
   * @return string         El nombre dado al archivo
   */
  static function saveFile($file, $name = null, $path): string
  {
    $name = $name ?? $file->getClientOriginalName();
    $extension = $file->extension();
    $finalName = pathinfo($name, PATHINFO_FILENAME) . '.' . $extension;
    $save = Storage::disk(env('FILESYSTEM_DRIVER'))
      ->putFileAs($path, $file, $finalName);

    if (!$save) {
      return '';
    }

    return $finalName;
  }

  /**
   * actualiza el archivo en el sistema de archivos de la app
   *
   * @param File $file            Nuevo Archivo a almacenar
   * @param String $oldFilename   nombre del actual archivo
   * @param String $path          ruta donde se almacena el nuevo archivo
   * @param String $name          El nombre para el nuevo archivo
   * @return String               El nombre dado al archivo
   */
  static function updateFile($file, $oldFilename, $path, $name = null): string
  {
    // eliminar el antiguo archivo
    $deleted = self::deleteFile($oldFilename, $path);

    // actualizar
    return self::saveFile($file, $name, $path);
  }

  /**
   * Elimina un archivo del sistema de archivos
   *
   * @param String $filename      nombre del archivo
   * @return boolean              true si fue eliminado, false caso contrario
   */
  static function deleteFile($filename, $path): bool
  {
    $fullPath = $path . $filename;
    return Storage::disk(env('FILESYSTEM_DRIVER'))->delete($fullPath);
  }
}
