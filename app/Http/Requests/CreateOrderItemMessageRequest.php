<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrderItemMessageRequest extends FormRequest
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
            'order_item_id' => 'required|integer',
            'user_id' => 'required|integer',
            'message' => 'required|string|min:1|max:2000',
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
            'order_item_id.required' => 'El campo "order_item_id" es obligatorio.',
            'order_item_id.integer' => 'El campo "order_item_id" debe ser un número entero.',
            'user_id.required' => 'El campo usuario es obligatorio.',
            'user_id.integer' => 'El campo usuario debe ser un número entero.',
            'message.required' => 'El campo mensaje es obligatorio.',
            'message.string' => 'El campo mensaje debe ser una cadena de caracteres.',
            'message.min' => 'El campo mensaje debe tener al menos 1 carácter.',
            'message.max' => 'El campo mensaje debe tener como máximo 2000 caracteres.',
        ];
    }
}
