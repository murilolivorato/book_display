<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\VerifyTitleExists;
use App\Rules\VerifyISBNExists;

class BookRequest extends FormRequest
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
            'title'               => [ 'required' , new VerifyTitleExists($this->id) ] ,
            'isbn'                => [ 'required' , new VerifyISBNExists($this->id) ] ,
            'author'              => 'required' ,
            'price'               => 'required' ,
            'category_id'         => 'required' ,
        ];
    }
}
