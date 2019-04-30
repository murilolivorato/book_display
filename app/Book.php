<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table    =  'books';
    protected $fillable = [
        'isbn',
        'author',
        'price',
        'title',

    ];

    // RELATION SHIP
    public function Category()
    {
        return $this->belongsToMany(BookCategory::class , 'book_book_categories' ,  'book_id' , 'category_id');
    }
}
