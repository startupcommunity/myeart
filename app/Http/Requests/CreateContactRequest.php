<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:2000',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'fullname.required' => 'El nombre es requerido',
            'fullname.string' => 'El nombre debe ser una cadena de texto',
            'fullname.max' => 'El nombre debe tener un máximo de 255 caracteres',
            'email.required' => 'El email es requerido',
            'email.email' => 'El email debe ser un email válido',
            'email.max' => 'El email debe tener un máximo de 255 caracteres',
            'message.required' => 'El mensaje es requerido',
            'message.string' => 'El mensaje debe ser una cadena de texto',
            'message.max' => 'El mensaje debe tener un máximo de 2000 caracteres',
        ];
    }
}
