<?php

namespace App\Querys\Traits;

trait UserEventTrait
{
  /**
   * Devuelve el valor entero de un string
   *
   * @return integer
   */
  public function getInt($string): int
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
   * Devuelve el valor de la constante de la publicación destacada
   *
   * @return integer
   */
  public static function FEATURED(): int
  {
    return 1;
  }

  /**
   * Devuelve el valor de la constante de la publicación de la semana
   *
   * @return integer
   */
  public static function WEEK(): int
  {
    return 3;
  }

  /**
   * Devuelve el valor de la constante de la publicación de los amigos
   *
   * @return integer
   */
  public static function FRIENDS(): int
  {
    return 5;
  }

  /**
   * comprueba si se debe ordenar por mas reciente
   */
  public function isMoreRecent($sortBy): bool
  {
    return $this->getInt($sortBy)  === self::MORE_RECENT();
  }

  /**
   * comprueba si se debe ordenar por orden alfabético
   */
  public function isAlphabeticalOrder($sortBy): bool
  {
    return $this->getInt($sortBy) === self::ALPHABETICAL_ORDER();
  }

  /**
   * Si se debe filtrar por destacadas
   */
  public function isFeatured($action): bool
  {
    return $this->getInt($action) === self::FEATURED();
  }

  /**
   * Si se debe filtrar por la semana
   */
  public function isWeek($action): bool
  {
    return $this->getInt($action) === self::WEEK();
  }

  /**
   * Si se debe filtrar por los amigos
   */
  public function isFriends($action): bool
  {
    return $this->getInt($action) === self::FRIENDS();
  }
}
