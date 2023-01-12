<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateLikeCollectiveRequest extends FormRequest
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
            'collective_id' => 'required|integer|exists:collectives,id',
            'user_id' => 'required|integer|exists:users,id',
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
            'collective_id.required' => 'El id del colectivo es requerido',
            'collective_id.integer' => 'El id del colectivo debe ser un entero',
            'collective_id.exists' => 'El colectivo no existe',
            'user_id.required' => 'El id del usuario es requerido',
            'user_id.integer' => 'El id del usuario debe ser un entero',
            'user_id.exists' => 'El usuario no existe',
        ];
    }
}
