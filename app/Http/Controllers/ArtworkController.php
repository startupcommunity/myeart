<?php

namespace App\Http\Controllers;

use App\Factories\ArtworkFactory;
use App\Http\Requests\CreateArtworkRequest;
use App\Models\Artwork;
use App\Models\Gallery;
use App\Querys\ArtworkDB;
use App\Utils\ResponseJson;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArtworkController extends Controller
{
    public $artworkfactory;
    private $resp;

    public function __construct(ArtworkFactory $artworkfactory, ResponseJson $resp)
    {
        $this->artworkfactory = $artworkfactory;
        $this->resp = $resp;
        // $this->authorizeResource(Artwork::class, 'id');
    }

    /**
     * Devuelve las obras del usuario logueado
     *
     * @return JsonResponse
     */
    public function getArtworks(): JsonResponse
    {
        $this->authorize('getArtworks', Artwork::class);

        $data = ArtworkDB::getUserArtworks();

        return $this->resp->json($data, 200);
    }

    /**
     * elimina una obra de manera soft de la vista del usuario
     *
     * @param integer $id           El id de la obra
     * @return JsonResponse
     */
    public function deleteArtworks(int $id): JsonResponse
    {
        $resp = ArtworkDB::softDelete($id);

        if (!$resp) {
            return response()->json('No se puedo eliminar', 500);
        }

        return $this->resp->json($resp, 200);
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
        $artwork = Artwork::with(['categories'])
            ->with(['gallery' => function ($q) {
                return $q->orderBy('id', 'ASC');
            }])->findOrFail($id);

        if (!$artwork) {
            return $this->resp->json('error al obtener los datos', 500);
        }

        return $this->resp->json($artwork, 200);
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

        // guardar y crear galeria
        $gallery = $artwork->gallery;
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
            return $this->resp->json('Error al obtener la imagen', 500);
        }

        return $this->resp->json($image, 200);
    }

    /**
     * Obtiene todas las obras publicadas
     * de todos los usuarios
     *
     * @return JsonResponse
     */
    public function getPublish(): JsonResponse
    {
        $data = ArtworkDB::getPublishArtworks();

        return $this->resp->json($data, 200);
    }

    /**
     * Marca como me gusta una obra concreta
     * con el usuario logueado
     *
     * @param integer $id           id de la obra
     * @return JsonResponse
     */
    public function liked(int $id): JsonResponse
    {
        $resp = ArtworkDB::liked($id);

        if (!$resp) {
            return $this->resp->json('Error al procesar la información', 500);
        }

        return $this->resp->json($resp, 200);
    }

    /**
     * Elimina un me gusta de una obra concreta
     * con el usuario logueado
     *
     * @param integer $id           id de la obra
     * @return JsonResponse
     */
    public function disliked(int $id): JsonResponse
    {
        $resp = ArtworkDB::disliked($id);

        if (!$resp) {
            return $this->resp->json('Error al eliminar la información', 500);
        }

        return $this->resp->json($resp, 200);
    }

    /**
     * Devuelve las obras filtradas publicadas hasta la fecha
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function filterArtworksPublished(Request $request): JsonResponse
    {
        $resp = ArtworkDB::filterPublished($request->all());

        if (!$resp) {
            return $this->resp->json('Error al obtener la información', 500);
        }

        return $this->resp->json($resp, 200);
    }

    /**
     * Devuelve los datos de una obra del usuario logueado
     *
     * @param integer $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $this->authorize('view', Artwork::class);

        $resp = ArtworkDB::getArtworkWithRelations($id);

        abort_if(!$resp, 500, 'error al obtener los datos');

        return $this->resp->json($resp, 200);
    }

    /**
     * Devuelve las obras del usuario indicado por
     * parámetro que han sido publicadas
     *
     * @param integer $id                   id del usuario
     * @param integer|null $artworkID       id de la obra a ignorar
     * @return JsonResponse
     */
    public function getUserPublish(int $id, int $artworkID = null): JsonResponse
    {
        $this->authorize('view', Artwork::class);

        $resp = ArtworkDB::getPublishUserArtworks($id, $artworkID);

        return $this->resp->json($resp, 200);
    }

    /**
     * Devuelve las obras filtrada por una categoría
     * se puede indicar el usuario si se requiere ignorar
     * las obras de dicho usuario
     *
     * @param integer $categoryID        id de la categoría
     * @param integer|null $userID       id del usuario a ignorar
     * @return JsonResponse
     */
    public function getPublishForCategory(int $categoryID, int $userID = null): JsonResponse
    {
        $this->authorize('view', Artwork::class);

        $resp = ArtworkDB::getPublishForCategory($categoryID, $userID);

        return $this->resp->json($resp, 200);
    }
}
