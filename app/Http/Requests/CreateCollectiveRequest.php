<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateCollectiveRequest extends FormRequest
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
        $id = $this->id;

        // actualización
        if ($id) {
            return [
                'name' => 'required|string|max:100|unique:collectives,name,' . $id,
                'type' => 'required|integer',
                'location' => 'required|string|max:100',
                'categories' => 'required|array|min:1',
                'description' => 'required|string|max:200',
            ];
        }

        // creación
        return [
            'name' => 'required|string|max:100|unique:collectives,name',
            'type' => 'required|integer',
            'location' => 'required|string|max:100',
            'categories' => 'required|array|min:1',
            'description' => 'required|string|max:200',
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
            'name.required' => 'El nombre del colectivo es requerido',
            'name.string' => 'El nombre del colectivo debe ser una cadena de texto',
            'name.max' => 'El nombre del colectivo no debe superar los 100 caracteres',
            'name.unique' => 'El nombre del colectivo ya está en uso, debe escoger otro',
            'type.required' => 'El tipo de colectivo es requerido',
            'type.integer' => 'El tipo de colectivo debe ser un número entero',
            'location.required' => 'La ubicación del colectivo es requerida',
            'location.string' => 'La ubicación del colectivo debe ser una cadena de texto',
            'location.max' => 'La ubicación del colectivo no debe superar los 100 caracteres',
            'categories.required' => 'Las categorías del colectivo son requeridas',
            'categories.array' => 'Las categorías del colectivo deben ser un arreglo',
            'categories.min' => 'Las categorías del colectivo deben tener al menos un elemento',
            'description.required' => 'La descripción del colectivo es requerida',
            'description.string' => 'La descripción del colectivo debe ser una cadena de texto',
            'description.max' => 'La descripción del colectivo no debe superar los 200 caracteres',
        ];
    }
}
