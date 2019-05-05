<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Book;

class VerifyISBNExists implements Rule
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
        return 'This ISBN  Already Exists , Chose Another One ';
    }

    private function validateUpdate($value)
    {
        // FIND BOOK BY TITLE
        $book_title  =  Book::where('isbn' , $value)->first();

        // IF HAS SAME TITLE
        if ($book_title) {
            // FIND BOOK BY ID
            $update_book = Book::find($this->id);
            // IF THIS TITLE IS NOT FROM THIS BOOK
            if($book_title != $update_book){
                return false;
            }
        }
        return true;


    }

    private function validateCreate($value)
    {
        // IF BOOK ISBN EXISTS RETURN FALSE
        return Book::where('isbn' , $value)->first() ?  false
                                                     :  true;
    }
}
