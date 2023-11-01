<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConfirmItemOrderRequest extends FormRequest
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
            'order_id' => 'required|integer',
            'item_id' => 'required|integer',
            'user_id' => 'required|integer',
            'delivered' => 'required',
            'rating' => 'nullable|integer|min:1|max:5',
            'comment' => 'nullable',
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
            'order_id.required' => 'El ID de la orden es requerido',
            'order_id.integer' => 'El ID de la orden debe ser un número entero',
            'item_id.required' => 'El ID del item es requerido',
            'item_id.integer' => 'El ID del item debe ser un número entero',
            'user_id.required' => 'El ID del usuario es requerido',
            'user_id.integer' => 'El ID del usuario debe ser un número entero',
            'delivered.required' => 'El estado de entrega es requerido',
            'rating.integer' => 'La calificación debe ser un número entero',
            'rating.min' => 'La calificación debe ser mayor o igual a 1',
            'rating.max' => 'La calificación debe ser menor o igual a 5',
        ];
    }
}
