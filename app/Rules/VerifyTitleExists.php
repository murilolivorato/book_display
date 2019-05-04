<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Book;

class VerifyTitleExists implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($id)
    {
        $this->id = $id;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
       // IS UPDATING
       if($this->id){
                return $this->validateUpdate($value);
       }

       // IS CREATING
        return $this->validateCreate($value);

    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'This Title  Already Exists , Chose Another One ';
    }


    private function validateUpdate($value)
    {
        // IF BOOK TITLE EXISTS and IT IS NOT THE SAME BOOK RETURN FALSE
        return Book::where('title' , $value)->where('id' , '!' ,$this->id )->first() ?  false
            :  true;
    }

    private function validateCreate($value)
    {
        // IF BOOK ISBN EXISTS RETURN FALSE
        return Book::where('title' , $value)->first() ?  false
                                                      :  true;
    }

}
