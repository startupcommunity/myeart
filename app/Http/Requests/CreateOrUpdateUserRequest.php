<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrUpdateUserRequest extends FormRequest
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
            'name' => 'required|string',
            'fecha_nacimiento' => 'required|string',
            'pais_id' => 'required',
            'bio_title' => 'nullable|max:255',
            'bio_content' => 'nullable|max:2000',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'el campo nombre no debe estar vacio',
            'fecha_nacimiento.required' => 'el campo fecha de nacimiento no debe estar vacio',
            'pais_id.required' => 'el campo país no debe estar vacio',
        ];
    }
}
