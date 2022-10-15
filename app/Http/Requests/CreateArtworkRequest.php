<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateArtworkRequest extends FormRequest
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
            'title'=> 'required|string|max:100',
            'description'=> 'required|string|max:230',
            'dimension'=> 'nullable|string|max:100',
            'price'=> 'required|numeric|max:999999999999',
            'date_created'=> 'nullable|string|max:10',
            'location'=> 'nullable|string|max:100',
            'shipping'=> 'nullable|string|max:100',
            'state'=> 'required|numeric|max:3',
            'categories'=> 'nullable',
            'styles'=> 'nullable',
            'techniques'=> 'nullable',
            'gallery'=> 'nullable',
        ];
    }
}
