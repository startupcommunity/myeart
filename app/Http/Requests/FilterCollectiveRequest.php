<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FilterCollectiveRequest extends FormRequest
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
            'category' => 'nullable|integer',
            'type' => 'nullable|integer',
            'sortBy' => 'nullable|integer',
            'page' => 'nullable|integer',
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
            'category.integer' => 'La Categoria debe ser un numero',
            'type.integer' => 'El tipo debe ser un numero',
            'sortBy.integer' => 'El orden debe ser un numero',
            'page.integer' => 'La pagina debe ser un numero',
        ];
    }
}
