<?php

namespace App\Factories;

use App\Models\Newsletter;
use Illuminate\Http\Request;

class NewsletterFactory
{
  public function __construct(private Newsletter $newsletter)
  {
    //
  }

  /**
   * Crea un nuevo mensaje de contacto
   *
   * @param Request $data       Datos del mensaje
   * @return null|Newsletter        Mensaje de contacto
   */
  public function create(Request $request): ?Newsletter
  {
    return $this->newsletter->create($request->all());
  }
}
