<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 30/04/2019
 * Time: 23:01
 */

namespace App\Classes\Books;
use App\Classes\Books\Destroy\DestroyBook;
use App\Classes\Books\Destroy\DestroyCategory;
use App\Book;

class ProcessBookDestroy
{
    protected $request;
    protected $list_index = [];

    public static function process($request , $books ){

        return  (new static)->handle($request , $books);
    }

    private function handle($request , $books ){
        return   $this->setRequest($request)
                       ->destroy()
                       ->result();
    }

    // SET REQUEST
    private function setRequest($request){

        $this->request = $request;
        return $this;
    }

    // DESTROY BOOK
    private function destroy(){

        foreach($this->request as $deleteItem) {
            $book = Book::find($deleteItem['id']);

            $book = new DestroyBook(
                new DestroyCategory(
                    $book,
                    $deleteItem['index'])
            );
        }

        // push index into index , to make VUE effect to delete
        $this->list_index = array_push($list_index , $book->destroy());

        return $this;
    }

    private function result(){

        if(empty($this->list_index)){
            return response()->json(['success'  =>  false ,
                                     'message' => 'Error , Try Later' ]);
        }

        // success
        return response()->json(['success' =>  true ,
                                 'index'   => $this->list_index  ]);
    }
}