<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserEventLikeRequest extends FormRequest
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
            'user_id' => 'required|integer',
            'event_id' => 'required|integer',
        ];
    }

    /**
     * @return array
     */
    public function messages()
    {
        return [
            'user_id.required' => 'El usuario es requerido',
            'user_id.integer' => 'El usuario debe ser un entero',
            'event_id.required' => 'El evento es requerido',
            'event_id.integer' => 'El evento debe ser un entero',
        ];
    }
}
