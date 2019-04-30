<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 30/04/2019
 * Time: 13:54
 */

namespace App\Classes\Books;
use App\BookCategory;

class LoadBookFormOptions
{
    public static function load($request){

        return  (new static)->handle($request);
    }

    private function handle($request){
        return   $this->setRequest($request)
                      ->getResult();
    }

    // SET REQUEST
    private function setRequest($request){

        $this->request = $request;
        return $this;
    }

    // PROCESS QUERY
    private function getResult()
    {

        $category               = BookCategory::select(['id', 'title'])->orderBy('id', 'ASC')->get();

        return response()->json([
                'category' => $category
        ]);
    }

}