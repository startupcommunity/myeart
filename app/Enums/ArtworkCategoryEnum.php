<?php

namespace App\Enums;

final class ArtworkCategoryEnum
{
  // enums
  const LITERATURE = 1;
  const PAINTING = 2;
  const SCULPTURE = 3;
  const DRAWING = 4;
  const PHOTOGRAPHY = 5;
  const CRAFT = 6;
  const BOOKS = 7;
  const OTHER = 8;

  // labels
  const LITERATURE_label = 'Literatura';
  const PAINTING_LABEL = 'Pintura';
  const SCULPTURE_LABEL = 'Escultura';
  const DRAWING_LABEL = 'Dibujo';
  const PHOTOGRAPHY_LABEL = 'Fotografía';
  const CRAFT_LABEL = 'Artesanía y Manualidades';
  const BOOKS_LABEL = 'Libros';
  const OTHER_LABEL = 'Otro';

  // qualified labels
  const LITERATURE_QUALIFY = 'Literario';
  const PAINTING_QUALIFY = 'Pintor';
  const SCULPTURE_QUALIFY = 'Escultor';
  const DRAWING_QUALIFY = 'Dibujante';
  const PHOTOGRAPHY_QUALIFY = 'Fotógrafo';
  const CRAFT_QUALIFY = 'Artesano';
  const BOOKS_QUALIFY = 'Escritor';
  const OTHER_QUALIFY = 'Otro';

  /**
   * Devuelve el label de la categoría
   *
   * @return array
   */
  public static function getLabels(): array
  {
    return [
      self::LITERATURE => self::LITERATURE_label,
      self::PAINTING => self::PAINTING_LABEL,
      self::SCULPTURE => self::SCULPTURE_LABEL,
      self::DRAWING => self::DRAWING_LABEL,
      self::PHOTOGRAPHY => self::PHOTOGRAPHY_LABEL,
      self::CRAFT => self::CRAFT_LABEL,
      self::BOOKS => self::BOOKS_LABEL,
      self::OTHER => self::OTHER_LABEL,
    ];
  }

  /**
   * Devuelve los calificativos para cada categoría
   *
   * @return array
   */
  public static function getQualifiedLabels(): array
  {
    return [
      self::LITERATURE => self::LITERATURE_QUALIFY,
      self::PAINTING => self::PAINTING_QUALIFY,
      self::SCULPTURE => self::SCULPTURE_QUALIFY,
      self::DRAWING => self::DRAWING_QUALIFY,
      self::PHOTOGRAPHY => self::PHOTOGRAPHY_QUALIFY,
      self::CRAFT => self::CRAFT_QUALIFY,
      self::BOOKS => self::BOOKS_QUALIFY,
      self::OTHER => self::OTHER_QUALIFY,
    ];
  }
}
