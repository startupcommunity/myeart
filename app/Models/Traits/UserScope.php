<?php

/**
 * Gestiona los scopes del modelo User
 *
 * @autor  Luis Annunziato: luisannunziato@gmail.com
 * @link https://luisan.dev
 */

namespace App\Models\Traits;

use App\Enums\ArtworkStateEnum;
use App\Enums\ProfileTypeEnum;
use App\Enums\ReleaseTypeEnum;
use App\Models\ChargingMethod;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

trait UserScope
{
  /**
   * Devuelve los usuario del tipo artista
   *
   * @param  Builder $query
   * @return Builder
   */
  public function scopeArtist($query)
  {
    return $query->whereHas(
      'profile',
      fn ($pro) => $pro->where('perfil', ProfileTypeEnum::ARTIST)
    );
  }

  /**
   * Filtra de no incluir el usuario indicado
   *
   * @param  Builder $query
   * @return Builder
   */
  public function scopeNotUser($query, $id)
  {
    return $query->where('id', '<>', $id);
  }

  /**
   * Filtra por las categorías de las obras de los artistas
   *
   * @param  Builder $query
   * @return Builder
   */
  public function scopeArtworkCategory($query, $cat = null, $sub = null, $label = null)
  {
    return $query->whereHas('artworks', fn ($art) => $art->category($cat, $sub, $label));
  }

  /**
   * Devuelve las publicaciones de los usuarios seguidos
   *
   * @param Builder $query
   * @return void
   */
  public function scopeFollowReleases($query)
  {
    return $query->whereHas('followingArtists', fn ($art) => $art->whereHas('following', fn ($rel) => $rel->releases()));
  }

  /**
   * Devuelve los artistas seguidos con sus publicaciones
   *
   * @param Builder $query
   * @return void
   */
  public function scopeFollowingArtistReleases($query, ?int $type = null)
  {
    $artists = $this->followingArtists();
    $releaseRelations = ['labels.user', 'likes.user', 'creator.artworks.categories', 'comments'];
    $type = $type ?? ReleaseTypeEnum::ARTIST;

    // indicar también el type del release
    $relations = [
      'following.releases' =>
      fn ($rel) => $rel->with($releaseRelations)->where('type', $type),
    ];

    return $artists->with($relations);
  }

  /**
   * Determina si el usuario tiene foto de perfil
   * @luisandev
   * @return boolean      true si posee
   */
  public function hasAProfilePhoto(): bool
  {
    return !is_null($this->profile_photo);
  }

  /**
   * Determina si el usuario tiene foto de portada
   * @luisandev
   * @return boolean      true si posee
   */
  public function hasAFrontPhoto(): bool
  {
    return !is_null($this->front_photo);
  }

  /**
   * Verificar si tiene obras publicadas
   *
   * @return boolean
   */
  public function hasPublishedArtworks(): bool
  {
    return $this->artworks()->get()->filter(fn ($art) => $art->isAvailable())->count() > 0;
  }

  /**
   * Verifica si solo tiene un método de cobro en la BD
   *
   * @return boolean
   */
  public function hasOnlyOneChargingMethod(): bool
  {
    return $this->chargingMethods()->count() <= 1;
  }

  /**
   * Colocar las obras en pausa como publicadas
   */
  public function setPausedArtworksAsPublished(): bool
  {
    return $this->artworks()
      ->where('state', ArtworkStateEnum::PAUSED)
      ->update(['state' => ArtworkStateEnum::PUBLISHED]);
  }

  /**
   * Devuelve el método de cobro por default del usuario
   */
  public function getDefaultChargingMethod(): ?ChargingMethod
  {
    return $this->chargingMethods()->where('default', 1)->first();
  }


  /**
   * Devuelve los pagos realizados por stripe del usuario hacia su cuenta bancaria
   *
   */
  public function getStripePayouts(): Collection
  {
    return $this->userStripePayouts()
      ->orderBy('created_at', 'desc')
      ->get();
  }
}
