<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 12/01/2019
 * Time: 14:24
 */

namespace App\Classes\CreateDBSeed;

use App\Classes\CreateDBSeed\DB\DBBookCategory;
use App\BookCategory;

class CreateBookCategory
{
    public function  handle(){
        $book_category_list = (new  DBBookCategory())->start_db();

        foreach($book_category_list as $item) {
            factory(BookCategory::class, 1)->create($item);
        }
    }
}