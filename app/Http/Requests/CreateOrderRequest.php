<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrderRequest extends FormRequest
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
            'address' => 'required|string',
            'postal_code' => 'required|string',
            'city' => 'required|string',
            'shipping_method' => 'required|integer',
            'tax' => 'required|numeric',
            'shipping' => 'required|numeric',
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
            'address.required' => 'La dirección es requerida',
            'postal_code.required' => 'El código postal es requerido',
            'city.required' => 'La ciudad es requerida',
            'shipping_method.required' => 'El método de envío es requerido',
            'tax.required' => 'El impuesto es requerido',
            'shipping.required' => 'El costo de envío es requerido',
        ];
    }
}
