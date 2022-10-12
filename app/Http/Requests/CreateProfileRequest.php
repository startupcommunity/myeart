<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateProfileRequest extends FormRequest
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
            'perfil' => 'required|integer',
            'date' => 'nullable|date',
            'sexo' => 'nullable|integer',
            'asociacion_arte' => 'nullable|max:50',
            'galeria' => 'nullable|max:50',
            'asociacion_turismo' => 'nullable|max:50',
            'consejeria_ayuntamiento' => 'nullable|max:50',
            'pais' => 'nullable|integer',
            'artistic_list' => 'nullable',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png|max:5000'
        ];
    }
}
