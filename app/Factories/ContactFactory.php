<?php

namespace App\Factories;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactFactory
{
  public function __construct(private Contact $contact)
  {
    //
  }

  /**
   * Crea un nuevo mensaje de contacto
   *
   * @param Request $data       Datos del mensaje
   * @return Contact            Mensaje de contacto
   */
  public function create(Request $request): Contact
  {
    return $this->contact->create($request->all());
  }
}
