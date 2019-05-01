<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 30/04/2019
 * Time: 22:31
 */
namespace App\Classes\Books\Save;
use App\Book;

class SyncBook
{
    public function __construct($book)
    {
        $this->book              = $book->publish();
        $this->request           = $book->request();
    }


    public function publish(){

        // BOOK
        $book = Book::find($this->book['id']);

        if ($book && $this->request['category_id']) {

            $book->Category()->sync(
                $this->request['category_id']
            );

        }

        return $this->book;
    }
}