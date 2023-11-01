<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateArtworkAnswerCommentRequest extends FormRequest
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
            'comment_id' => 'required|integer',
            'user_id' => 'required|integer',
            'answer' => 'required|string|max:1000',
        ];
    }

    public function messages()
    {
        return [
            'comment_id.required' => 'El id del comentario es requerido',
            'comment_id.integer' => 'El id del comentario debe ser un número entero',
            'user_id.required' => 'El usuario/artista es requerido',
            'user_id.string' => 'El id del usuario debe ser un número entero',
            'answer.required' => 'La respuesta es requerida',
            'answer.string' => 'La respuesta debe ser un string',
            'answer.max' => 'La respuesta debe tener un máximo de 1000 caracteres',
        ];
    }
}
