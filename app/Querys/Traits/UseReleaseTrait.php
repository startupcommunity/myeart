<?php

namespace App\Querys\Traits;

trait UseReleaseTrait
{
  /**
   * Devuelve el valor entero de un string
   *
   * @return integer
   */
  public function getSortByInt($string): int
  {
    return intval($string);
  }

  /**
   * Devuelve el valor de la constante de la publicación más reciente
   *
   * @return integer
   */
  public static function MORE_RECENT(): int
  {
    return 1;
  }

  /**
   * Devuelve el valor de la constante de la publicación ordenada alfabéticamente
   *
   * @return integer
   */
  public static function ALPHABETICAL_ORDER(): int
  {
    return 2;
  }

  /**
   * comprueba si se debe filtrar por mas reciente
   */
  public function isMoreRecent($sortBy): bool
  {
    return $sortBy === self::MORE_RECENT();
  }

  /**
   * comprueba si se debe filtrar por orden alfabético
   */
  public function isAlphabeticalOrder($sortBy): bool
  {
    return $sortBy === self::ALPHABETICAL_ORDER();
  }
}
