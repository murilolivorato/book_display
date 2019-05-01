<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 30/04/2019
 * Time: 23:11
 */

namespace App\Classes\Books\Destroy;

class DestroyCategory
{
    protected $book;
    protected $index;

    public function __construct(Book $book , $index )
    {
        $this->book      = $book;
        $this->index     = $index;
    }

    public function index(){
        return  $this->index;
    }

    public function destroy()
    {
        // DETATCH ALL CATEGORY
        $this->book->Category()->detach();

        return $this->book;
    }
}