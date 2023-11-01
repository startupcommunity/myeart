<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateArtworkCommentRequest extends FormRequest
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
            'comment' => 'required|string|max:500',
            'artwork_id' => 'required|integer',
            'user_id' => 'required|integer',
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
            'comment.required' => 'El comentario/pregunta es requerido',
            'comment.string' => 'El comentario/pregunta debe ser un string',
            'comment.max' => 'El comentario/pregunta debe tener un máximo de 500 caracteres',
            'artwork_id.required' => 'La obra es requerida',
            'user_id.required' => 'El usuario que pregunta es requerido',
        ];
    }
}
