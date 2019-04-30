<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BookCategory extends Model
{
    protected $table    =  'book_categories';
    protected $fillable = [
        'title',

    ];

    // RELATION SHIP
    public function Books()
    {
        return $this->belongsToMany(Book::class , 'book_book_categories' , 'category_id'  , 'book_id');
    }
}
