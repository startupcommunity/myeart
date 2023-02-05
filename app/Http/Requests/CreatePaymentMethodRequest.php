<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePaymentMethodRequest extends FormRequest
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
            // 'bank_id' => 'required|integer',
            // 'card_type' => 'required|string',
            // 'card_number' => 'required|string',
            // 'card_expiration' => 'required|string',
            // 'card_cvv' => 'required|string',
            'account_number' => 'required|string',
            'fullname' => 'required|string',
            'bank_name' => 'required|string',
            'user_id' => 'required|integer',
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
            // 'bank_id.required' => 'El banco es requerido',
            // 'bank_id.integer' => 'El banco debe ser un número entero',
            // 'card_type.required' => 'El tipo de tarjeta es requerido',
            // 'card_type.string' => 'El tipo de tarjeta debe ser un texto',
            // 'card_number.required' => 'El número de tarjeta es requerido',
            // 'card_number.string' => 'El número de tarjeta debe ser un texto',
            // 'card_expiration.required' => 'La fecha de expiración es requerida',
            // 'card_expiration.string' => 'La fecha de expiración debe ser un texto',
            // 'card_cvv.required' => 'El código de seguridad es requerido',
            // 'card_cvv.string' => 'El código de seguridad debe ser un texto',
            'account_number.required' => 'El número de cuenta es requerido',
            'account_number.string' => 'El número de cuenta debe ser un texto',
            'fullname.required' => 'El nombre completo es requerido',
            'fullname.string' => 'El nombre completo debe ser un texto',
            'bank_name.required' => 'El nombre del banco es requerido',
            'bank_name.string' => 'El nombre del banco debe ser un texto',
            'user_id.required' => 'El usuario es requerido',
            'user_id.integer' => 'El usuario debe ser un número entero',
        ];
    }
}
