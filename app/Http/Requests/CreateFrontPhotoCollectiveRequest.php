<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateFrontPhotoCollectiveRequest extends FormRequest
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
            'front_image' => 'required|image|mimes:jpeg,png,jpg|max:5000',
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
            'front_image.required' => 'La foto de portada es requerida',
            'front_image.image' => 'La foto de portada debe ser una imagen',
            'front_image.mimes' => 'La foto de portada debe ser un archivo de tipo: jpeg, png, jpg',
            'front_image.max' => 'La foto de portada no debe ser mayor a 5MB',
            'id_collective.required' => 'El colectivo es requerido',
            'id_collective.integer' => 'El colectivo debe ser un número entero'
        ];
    }
}
