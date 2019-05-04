<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 04/05/2019
 * Time: 08:37
 */

namespace App\Classes\Books\Save;
use App\Book;

class GetBookInfo
{
    protected $book;
    protected $request;
    protected $action;

    public function __construct($book)
    {
        $this->book              = $book->publish();
        $this->request           = $book->request();
        $this->action            = $book->action();
    }

    public function publish(){

        if ($this->book){
                    return [
                        'success'    => true ,
                        'new_record' => [
                            'index'        => $this->request['index'] ,
                            'id'           => $this->NewRecordId() ,
                            'isbn'         => $this->request['isbn'] ,
                            'author'       => $this->request['author'] ,
                            'price'        => $this->request['price'] ,
                            'title'        => $this->request['title'] ,
                            'category_id'  => $this->request['category_id'] ,
                        ]
                    ];
        }

    }

    private function NewRecordId(){
        //IF IS CREATING , GET THE LAS RECORD / IF IS UPDATING JUST GET ID REQUEST
        return $this->action == "isUpdating"?  $this->request['id'] :
                                                Book::orderBy('created_at', 'desc')->first()->id;
    }
}