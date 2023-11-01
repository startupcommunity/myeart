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
            'title' => 'required_if:state,1|required_if:state,5|string|max:100',
            'description' => 'required_if:state,1|required_if:state,5|nullable|string|max:230',
            'width' => 'required_if:state,1|required_if:state,5|nullable|max:1000|numeric',
            'large' => 'required_if:state,1|required_if:state,5|nullable|max:1000|numeric',
            'weight' => 'required_if:state,1|required_if:state,5|nullable|max:1000|numeric',
            'price' => 'required_if:state,1|required_if:state,5|nullable|max:9999999999|numeric',
            'date_created' => 'required_if:state,1|required_if:state,5|nullable|string|max:10',
            'target' => 'required_if:state,1|required_if:state,5|nullable|string|max:255',
            'province' => 'required_if:state,1|required_if:state,5|nullable|string|max:255',
            'location' => 'required_if:state,1|required_if:state,5|nullable|string|max:100',
            'shipping' => 'nullable|string|max:100',
            'state' => 'required|numeric|max:5',
            'type' => 'nullable',
            'gallery' => 'nullable',
            'large_description' => 'nullable',
            'other_details' => 'nullable',
        ];
    }

    /**
     * Messages
     */
    public function messages()
    {
        return [
            'title.required_if' => 'El título es requerido cuando se quiere publicar la obra',
            'title.string' => 'El título debe ser un texto de palabras, no debe incluir números o caracteres especiales',
            'title.max' => 'El título debe tener un máximo de 100 caracteres',
            'description.required_if' => 'La descripción es requerida cuando se quiere publicar la obra',
            'description.string' => 'La descripción debe ser un string',
            'description.max' => 'La descripción debe tener un máximo de 230 caracteres',
            'width.required_if' => 'El ancho es requerido cuando se quiere publicar la obra',
            'width.max' => 'El ancho debe tener un máximo de 1000 caracteres',
            'large.required_if' => 'El largo es requerido cuando se quiere publicar la obra',
            'large.max' => 'El largo debe tener un máximo de 1000 caracteres',
            'weight.required_if' => 'El peso es requerido cuando se quiere publicar la obra',
            'weight.max' => 'El peso debe tener un máximo de 1000 caracteres',
            'price.required_if' => 'El precio es requerido cuando se quiere publicar la obra',
            'price.max' => 'El precio debe tener un máximo de 9999999999 caracteres',
            'price.numeric' => 'El precio debe ser un número',
            'date_created.required_if' => 'La fecha de creación es requerida cuando se quiere publicar la obra',
            'date_created.max' => 'La fecha de creación debe tener un máximo de 10 caracteres',
            'target.required_if' => 'La ubicación es requerida cuando se quiere publicar la obra',
            'target.max' => 'La ubicación debe tener un máximo de 255 caracteres',
            'province.required_if' => 'La provincia es requerida cuando se quiere publicar la obra',
            'province.max' => 'La provincia debe tener un máximo de 255 caracteres',
            'location.required_if' => 'La localidad es requerida cuando se quiere publicar la obra',
            'location.max' => 'La localidad debe tener un máximo de 100 caracteres',
            'shipping.max' => 'El envío debe tener un máximo de 100 caracteres',
            'state.required' => 'El estado es requerido',
            'state.numeric' => 'El estado debe ser un número',
            'state.max' => 'El estado debe tener un máximo de 5 caracteres',
            'type.required' => 'El tipo es requerido',
            'gallery.required' => 'La galería es requerida',
            'large_description.required' => 'La descripción ampliada es requerida',
            'other_details.required' => 'Los detalles adicionales son requeridos',
        ];
    }
}
