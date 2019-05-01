<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 30/04/2019
 * Time: 22:18
 */

namespace App\Classes\Books;
use App\Classes\Books\Save\SaveBook;
use App\Classes\Books\Save\SyncBook;

class ProcessBook
{
    protected $request;
    protected $result;

    public static function process($request , $books ){

        return  (new static)->handle($request , $books);
    }

    private function handle($request , $books ){
        return   $this->setRequest($request)
                      ->save($books)
                      ->getResult();
    }

    // SET REQUEST
    private function setRequest($request){

        $this->request = $request;
        return $this;
    }

    // SAVE BOOK
    private function save($books)
    {

       $book = new SyncBook(
                        new SaveBook($books,
                                     $this->request

                        )
        );

        $this->result = $book->publish();
        return $this;

    }

    public function getResult(){

        if(! $this->result['success'] ){
            return response()->json(['success'  =>  false ,
                                     'message' => 'It Has an Error !!' ]);

        }

        // SUCCESS
        return response()->json(['success'    =>  true ,
                                 'message'    => 'Saved' ,
                                 'new_record' => $this->result['new_record'] ]);
    }


}