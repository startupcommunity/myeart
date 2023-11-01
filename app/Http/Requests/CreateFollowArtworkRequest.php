<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateFollowArtworkRequest extends FormRequest
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
            'artwork_id' => 'required|integer',
            // 'user_id' => 'required|integer',
        ];
    }

    public function messages()
    {
        return [
            'artwork_id.required' => 'El id de la obra es requerido',
            'artwork_id.integer' => 'El id de la obra debe ser un número entero',
            // 'user_id.required' => 'El id del usuario es requerido',
            // 'user_id.integer' => 'El id del usuario debe ser un número entero',
        ];
    }
}
