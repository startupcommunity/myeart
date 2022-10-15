<?php

namespace App\Utils;

use Illuminate\Http\JsonResponse;

class ResponseJson
{

  /**
   * Devuelve una respuesta json
   *
   * @param array $data
   * @param integer $status
   * @param array $headers
   * @param integer $options
   * @return JsonResponse
   */
  public function json(
    $data = [],
    $status = 200,
    array $headers = [],
    $options = 0
  ): JsonResponse {
    return response()->json($data, $status, $headers, $options);
  }
}
