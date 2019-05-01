<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 01/05/2019
 * Time: 14:01
 */

namespace App\Classes\Books;


class BookCollection
{
    public static function load($result)
    {


        $collection = collect($result);

        $collection = $collection->map(function ($item, $key) {


            return [
                'id'          => $item->id,
                'isbn'        => $item->isbn,
                'author'      => $item->author,
                'price'       => $item->price,
                'title'       => $item->title,
                'category_id' => self::getCategoryArrayList($item->category)


                  ];
        });

        return $collection;

    }

    // PUT ALL THE CATEGORIES IDS INSIDE AN ARRAY , IT WILL MAKE IT BETTER TO MANIPULATE , IT IS OPCIONAL
    private static function getCategoryArrayList($categories){

        return collect($categories->map(function ($item, $key) {

            return $item['id'];
        }));

    }
}