<?php

namespace App\Http\Controllers;

use App\Factories\ArtworkFactory;
use App\Http\Requests\CreateArtworkRequest;
use App\Models\Artwork;
use App\Models\Gallery;
use App\Querys\ArtworkDB;
use App\Utils\ResponseJson;
use Illuminate\Http\JsonResponse;

class ArtworkController extends Controller
{
    public $artworkfactory;
    private $resp;

    public function __construct(ArtworkFactory $artworkfactory, ResponseJson $resp)
    {
        $this->artworkfactory = $artworkfactory;
        $this->resp = $resp;
    }
    /**
     * Devuelve las obras del usuario logueado
     *
     * @return JsonResponse
     */
    public function getArtworks(): JsonResponse
    {
        $data = ArtworkDB::getUserArtworks();

        return response()->json($data, 200);
    }

    /**
     * elimina una obra de manera soft de la vista del usuario
     *
     * @param integer $id           El id de la obra
     * @return JsonResponse
     */
    public function deleteArtworks(int $id): JsonResponse
    {
        $res = ArtworkDB::softDelete($id);

        if ($res) {
            return response()->json($res, 200);
        }

        return response()->json($res, 500);
    }

    /**
     * Publica o guarda como borrador una obra del usuario
     *
     * @param CreateArtworkRequest $request
     * @return JsonResponse
     */
    public function save(CreateArtworkRequest $request): JsonResponse
    {
        $data = $request->all();
        $hasFiles = isset($data['gallery']);

        // guardar y crear obra
        $artwork = $this->artworkfactory->saveSyncArtwork($data);

        // guardar y crear galeria
        !$hasFiles ?: $this->artworkfactory->uploadGalleryFiles($artwork, $data['gallery']);

        if (!$artwork) {
            return $this->resp->json('error al guardar los datos', 500);
        }

        return $this->resp->json($artwork, 200);
    }

    /**
     * Devuelve los datos de una obra del usuario
     *
     * @param integer $id           el id de la obra
     * @return JsonResponse
     */
    public function editArtworks(int $id): JsonResponse
    {
        $artwork = Artwork::with(['categories', 'techniques', 'styles'])
            ->with(['gallery' => function ($q) {
                return $q->orderBy('id', 'ASC');
            }])->findOrFail($id);

        if (!$artwork) {
            return $this->resp->json('error al obtener los datos', 500);
        }

        $data = [
            'artwork' => $artwork,
        ];

        return $this->resp->json($data, 200);
    }

    /**
     * Actualiza una obra y sus relaciones
     * actualiza la galeria de imagenes de la obra
     *
     * @param CreateArtworkRequest $request
     * @param integer $id
     * @return JsonResponse
     */
    public function update(CreateArtworkRequest $request, int $id): JsonResponse
    {
        $data = $request->all();
        $hasFiles = isset($data['gallery']);

        // Actualizar la obra
        $artwork = $this->artworkfactory->updateSyncArtwork($data, $id);
        $gallery = $artwork->gallery;

        // guardar y crear galeria
        !$hasFiles ?: $this->artworkfactory->updateGallery($data['gallery'], $gallery, $artwork);

        if (!$artwork) {
            return $this->resp->json('error al guardar los datos', 500);
        }

        return $this->resp->json($artwork, 200);
    }

    /**
     * Devuelve los datos de una imagen de una obra
     *
     * @param integer $id           id de la imagen
     * @return JsonResponse
     */
    public function getImage(int $id): JsonResponse
    {
        $image = Gallery::findOrFail($id);
        if (!$image) {
            return $this->resp->json('error al guardar los datos', 500);
        }

        return $this->resp->json($image, 200);
    }
}
