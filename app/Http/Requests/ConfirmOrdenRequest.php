<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConfirmOrdenRequest extends FormRequest
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
            'delivered' => 'required',
            'rating' => 'nullable|integer',
            'comment' => 'nullable|string',
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
            'order_id.required' => 'La orden es requerido',
            'order_id.integer' => 'La orden debe ser un número entero',
            'delivered.required' => 'El estado de la orden es requerido, por favor marque una opción',
            'rating.integer' => 'La calificación debe ser un número entero',
            'comment.string' => 'El comentario debe ser un texto',
        ];
    }
}
