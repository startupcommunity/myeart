<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserEventRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'image' => 'required|mimes:jpeg,png,jpg|max:2048',
            'mode' => 'required|string',
            'init_date' => 'required|date',
            'init_time' => 'required|string|max:10',
            'location' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'description' => 'nullable|string|max:2000',
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
            'name.required' => 'El nombre es requerido',
            'name.string' => 'El nombre debe ser un texto',
            'name.max' => 'El nombre debe tener máximo 255 caracteres',
            'image.required' => 'La imagen es requerida',
            'image.file' => 'La imagen debe ser un archivo',
            'image.image' => 'La imagen debe ser una imagen',
            'image.mimes' => 'La imagen debe ser un archivo de tipo jpeg, png o jpg',
            'image.max' => 'La imagen debe tener máximo 2048 kilobytes',
            'mode.required' => 'El modo es requerido',
            'mode.string' => 'El modo debe ser un texto',
            'init_date.required' => 'La fecha de inicio es requerida',
            'init_date.date' => 'La fecha de inicio debe ser una fecha',
            'init_time.required' => 'La hora de inicio es requerida',
            'init_time.string' => 'La hora de inicio debe ser un texto',
            'init_time.max' => 'La hora de inicio debe tener máximo 10 caracteres',
            'location.required' => 'La ubicación es requerida',
            'location.string' => 'La ubicación debe ser un texto',
            'location.max' => 'La ubicación debe tener máximo 255 caracteres',
            'phone_number.required' => 'El número de teléfono es requerido',
            'phone_number.string' => 'El número de teléfono debe ser un texto',
            'phone_number.max' => 'El número de teléfono debe tener máximo 20 caracteres',
            'description.string' => 'La descripción debe ser un texto',
            'description.max' => 'La descripción debe tener máximo 2000 caracteres',
        ];
    }
}
