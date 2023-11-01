<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShippingAddressRequest extends FormRequest
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
            'direction' => 'required|string|max:200',
            'postal_code' => 'required|string|max:10',
            'city' => 'required|string|max:200',
            'phone_code' => 'required|string|max:10',
            'phone_number' => 'required|numeric|max:9999999999999999999',
            'default' => 'required|numeric|in:1,0',
        ];
    }
}
