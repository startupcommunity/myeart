<?php

namespace App\Querys;

use App\Enums\ArtworkStateEnum;
use App\Models\Artwork;
use Illuminate\Database\Eloquent\Collection;

class ArtworkDB
{
    /**
     * Devuelve las obras del usuario logueado
     * junto a sus relaciones
     */
    public static function getUserArtworks(): Collection
    {
        $userID = auth()->user()->id;
        $data = Artwork::with(['categories', 'styles', 'techniques', 'gallery', 'user'])
            ->where('user_id', $userID)
            ->orderBy('id', 'Desc')
            ->get();

        return $data;
    }

    /**
     * Devuelve todas las obras publicadas de los usuarios
     */
    public static function getPublishArtworks(): Collection
    {
        return Artwork::with(['categories', 'styles', 'techniques', 'gallery', 'user'])
            ->where('state', ArtworkStateEnum::PUBLISHED)
            ->orderBy('id', 'Desc')
            ->get();
    }

    /**
     * Obtiene una obra por medio de su id
     *
     * @param integer $id           El id de la obra
     * @return Artwork
     */
    public static function getArtwork(int $id): Artwork
    {
        return Artwork::findOrFail($id);
    }

    /**
     * Elimina una obra de forma soft para no ser visualizada por el usuario
     *
     * @param integer $id           id de la obra
     * @return boolean
     */
    public static function softDelete(int $id): bool
    {
        $artwork = self::getArtwork($id);

        if ($artwork) {
            return $artwork->delete();
        }

        return false;
    }
}
