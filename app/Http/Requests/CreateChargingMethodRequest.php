<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateChargingMethodRequest extends FormRequest
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
            'account_number' => 'required|string',
            // 'stripe_bank_account_id' => 'required|string',
            // 'country' => 'required|string',
            // 'currency' => 'required|string',
            // 'routing_number' => 'nullable|string',
            // 'account_name' => 'nullable|string',
            // 'account_holder_name' => 'required|string',
            // 'account_holder_type' => 'required|string',
            // 'default' => 'required|integer',
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
            'account_number.required' => 'El número de cuenta es requerido',
            'account_number.string' => 'El número de cuenta debe ser una cadena de texto',
            // 'stripe_bank_account_id.required' => 'El id de la cuenta de banco es requerido',
            // 'stripe_bank_account_id.string' => 'El id de la cuenta de banco debe ser una cadena de texto',
            // 'country.required' => 'El país es requerido',
            // 'country.string' => 'El país debe ser una cadena de texto',
            // 'currency.required' => 'La moneda es requerida',
            // 'currency.string' => 'La moneda debe ser una cadena de texto',
            // 'routing_number.string' => 'El número de ruta debe ser una cadena de texto',
            // 'account_name.string' => 'El nombre de la cuenta debe ser una cadena de texto',
            // 'account_holder_name.required' => 'El nombre del titular de la cuenta es requerido',
            // 'account_holder_name.string' => 'El nombre del titular de la cuenta debe ser una cadena de texto',
            // 'account_holder_type.required' => 'El tipo de titular de la cuenta es requerido',
            // 'account_holder_type.string' => 'El tipo de titular de la cuenta debe ser una cadena de texto',
            // 'default.required' => 'El campo default es requerido',
            // 'default.integer' => 'El campo default debe ser un número entero',
        ];
    }
}
