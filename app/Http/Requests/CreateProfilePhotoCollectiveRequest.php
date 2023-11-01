<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateProfilePhotoCollectiveRequest extends FormRequest
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
            'profile_image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'id_collective' => 'required|integer'
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
            'profile_image.required' => 'La foto de perfil es requerida',
            'profile_image.image' => 'La foto de perfil debe ser una imagen',
            'profile_image.mimes' => 'La foto de perfil debe ser un archivo de tipo: jpeg, png, jpg',
            'profile_image.max' => 'La foto de perfil no debe ser mayor a 2MB',
            'id_collective.required' => 'El colectivo es requerido',
            'id_collective.integer' => 'El colectivo debe ser un número entero'
        ];
    }
}
