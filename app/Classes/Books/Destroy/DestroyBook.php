<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 30/04/2019
 * Time: 23:11
 */
namespace App\Classes\Books\Destroy;
use App\Book;

class DestroyBook
{
    protected $book;
    protected $index;

    public function __construct($book)
    {
        $this->book      = $book->destroy();
        $this->index     = $book->index();
    }

    public function index(){
        return  $this->index;
    }

    public function destroy()
    {
        // DELETE ASSOCIATED
        $this->book->delete();

        return $this->index;
    }
}