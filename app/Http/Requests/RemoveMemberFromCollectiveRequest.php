<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RemoveMemberFromCollectiveRequest extends FormRequest
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
            'user_id' => 'required|integer|exists:users,id',
            'collective_id' => 'required|integer|exists:collectives,id',
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
            'user_id.required' => 'El usuario es requerido',
            'user_id.integer' => 'El usuario debe ser un número entero',
            'user_id.exists' => 'El usuario no existe',
            'collective_id.required' => 'El colectivo es requerido',
            'collective_id.integer' => 'El colectivo debe ser un número entero',
            'collective_id.exists' => 'El colectivo no existe',
        ];
    }
}
