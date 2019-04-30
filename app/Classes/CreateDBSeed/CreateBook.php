<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 12/01/2019
 * Time: 14:24
 */

namespace App\Classes\CreateDBSeed;

use App\Classes\CreateDBSeed\DB\DBBook;
use App\Book;

class CreateBook
{
    public function  handle(){
        $book_category_list = (new  DBBook())->start_db();

        foreach($book_category_list as $item) {

            factory(Book::class ,1)->create([
                'isbn'   => $item['isbn'] ,
                'author' => $item['author'] ,
                'price'  => $item['price'] ,
                'title'  => $item['title']

            ])->each(function($book) use ($item)  {

                $book->Category()->sync(
                                 $item['category_ids']
                         );
            });
        }
    }
}