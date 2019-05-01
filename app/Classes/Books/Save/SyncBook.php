<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 30/04/2019
 * Time: 22:31
 */
namespace App\Classes\Books\Save;
use App\Book;
use App\BookCategory;

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

        return [
               'success'    => true ,
               'new_record' => [
                   'index'        => $this->request['index'] ,
                   'isbn'         => $this->request['isbn'] ,
                   'author'       => $this->request['author'] ,
                   'price'        => $this->request['price'] ,
                   'title'        => $this->request['title'] ,
                   'category_id'  => $this->request['category_id'] ,
               ]
        ];
    }
}