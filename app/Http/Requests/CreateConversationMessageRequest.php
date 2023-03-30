<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateConversationMessageRequest extends FormRequest
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
            'conversation_id' => 'required|integer',
            'user_id' => 'required|integer',
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
            'conversation_id.required' => 'La conversación es requerida',
            'conversation_id.integer' => 'La conversación debe ser un entero',
            'user_id.required' => 'El usuario es requerido',
            'user_id.integer' => 'El usuario debe ser un entero',
            'message.required' => 'El mensaje es requerido',
            'message.string' => 'El mensaje debe ser un string',
            'message.max' => 'El mensaje debe tener un máximo de 2000 caracteres',
        ];
    }
}
