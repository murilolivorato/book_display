<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 30/04/2019
 * Time: 22:31
 */

namespace App\Classes\Books\Save;
use App\Book;
use Illuminate\Http\Request;

class SaveBook
{
    protected $book;
    protected $request;


    public function __construct(Book $book, Request $request )
    {
        $this->book        = $book;
        $this->request     = $request;
    }

    public function request(){
        return  $this->request;
    }

    public function publish(){

        $this->book->isbn   = $this->request['isbn'];
        $this->book->author = $this->request['author'];
        $this->book->price  = $this->request['price'];
        $this->book->title  = $this->request['title'];

        $this->book->save();

        return $this->book;
    }
}