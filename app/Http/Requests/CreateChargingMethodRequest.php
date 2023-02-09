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
        $isUpdate = $this->method() === 'PUT' || $this->method() === 'PATCH';

        $user = auth()->user();

        if ($isUpdate) {
            return [
                'user_id' => 'required|integer',
                'account_number' => 'required|string|unique:charging_methods,account_number,' . $this->id . ',id,deleted_at,NULL',
            ];
        }

        // el campo único debe ser único para el usuario
        return [
            'user_id' => 'required|integer',
            'account_number' => 'required|string|unique:charging_methods,account_number,NULL,id,user_id,' . $user->id . ',deleted_at,NULL',
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
            'account_number.unique' => 'El número de cuenta ya esta registrado',
        ];
    }
}
