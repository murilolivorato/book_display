<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Classes\Books\LoadBookDisplay;
use App\Classes\Books\LoadBookFormOptions;

// REQUEST
use App\Http\Requests\BookRequest;


class Books extends Controller
{
    public function __construct()
    {



    }

    /**********************************************************************************
    INDEX
     ***********************************************************************************/
    public function index()
    {
        return view('books', [ 'pg'              => "books-pg"]  );

    }

    /**********************************************************************************
    LOAD DISPLAY LIST
     ***********************************************************************************/
    public function load_display(Request $request){

        return LoadBookDisplay::load($request);
    }

    /**********************************************************************************
    FORM OTIONS FOR DISPLAY
     ***********************************************************************************/
    public function display_form_options(Request $request)
    {
        return LoadBookFormOptions::load($request);
    }

    /**********************************************************************************
    STORE
     ***********************************************************************************/
    public function store(BookRequest $request)
    {


    }



    /**********************************************************************************
    UPDATE
     ***********************************************************************************/
    public function update(Request $request)
    {


    }


    /**********************************************************************************
    DELETE
     ***********************************************************************************/
    public function destroy(Request $request)
    {

    }
}
