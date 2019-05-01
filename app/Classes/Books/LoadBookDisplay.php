<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 30/04/2019
 * Time: 07:44
 */

namespace App\Classes\Books;
use App\Classes\Books\BookCollection;
use App\Classes\Helpers\SetQueries;

use App\Book;

class LoadBookDisplay
{
    protected $request;
    protected $result;
    protected $paginateNumber = 5;
    protected $page = null;

    public static function load($request){

        return  (new static)->handle($request);
    }

    private function handle($request){

        return   $this->setRequest($request)
                      ->processQuery()
                      ->getResult();
    }

    // SET REQUEST
    private function setRequest($request){

        $this->request = $request;
        return $this;
    }

    // PROCESS QUERY
    private function processQuery()
    {

        $isbn                    = $this->request->input('isbn');
        $title                   = $this->request->input('title');
        $author                  = $this->request->input('author');
        $category_id             = $this->request->input('category_id');
        $page                    = $this->request->input('page');


        $result  = Book::select(['id',  'isbn',  'author',  'price',  'title', ])
            ->orderBy('id', 'desc')

            // WHEN HAS ISBN
            ->when($isbn, function ($query) use ($isbn) {
                return $query->where('isbn', 'like' , '%' .$isbn .'%' );
            })

            // WHEN HAS TITLE
            ->when($title, function ($query) use ($title) {
                return $query->where('title', 'like' , '%' . $title .'%'  );
            })

            // WHEN HAS AUTHOR
            ->when($author, function ($query) use ($author) {
                return $query->where('author', 'like' , '%' .  $author  .'%' );
            })

            // WHEN HAS CATEGORY
            ->when($category_id, function ($query) use ($category_id) {
                $query->WhereHas('Category' , function($query)  use ($category_id) {
                    return $query->whereIn('id' , SetQueries::convertArray($category_id) );

                });
            })

            // WITH CATEGORY
            ->with([ 'Category' => function($query) {
                $query->select('id','title');
            } ])

            ->paginate($this->paginateNumber , ['*'], 'page', $page );


            $this->result = [
                'pagination' => [
                    'total'         => $result->total(),
                    'per_page'      => $result->perPage(),
                    'current_page'  => $result->currentPage(),
                    'last_page'     => $result->lastPage(),
                    'from'          => $result->firstItem(),
                    'to'            => $result->lastItem()
                ],
                'data'             => BookCollection::load($result->items())
            ];



            return $this;
    }

    // GET RESULT
    private function getResult(){

        return  $this->result ;

    }
}