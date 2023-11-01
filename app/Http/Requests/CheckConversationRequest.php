<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckConversationRequest extends FormRequest
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
            'first_user_id' => 'required|integer',
            'second_user_id' => 'required|integer',
        ];
    }

    public function messages()
    {
        return [
            'first_user_id.required' => 'El id del primer usuario es requerido',
            'first_user_id.integer' => 'El id del primer usuario debe ser un número entero',
            'second_user_id.required' => 'El id del segundo usuario es requerido',
            'second_user_id.integer' => 'El id del segundo usuario debe ser un número entero',
        ];
    }
}
