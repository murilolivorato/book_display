<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


/* -----------------------------------------------------------------------------------  BOOKS */

Route::get('books' , [
    'uses'        => 'Books@index' , 'as'          => 'books'
]);

Route::get('books/load-display' , [
    'uses'        => 'Books@load_display'
]);

Route::get('books/display-form-options' , [
    'uses'        => 'Books@display_form_options'
]);

Route::post('books/store' , [
    'uses'        => 'Books@store' , 'as'          => 'books.store'
]);

Route::post('books/update/{id}' , [
    'uses'        => 'Books@update' , 'as'          => 'books.update'
]);

Route::post('books/destroy' , [
    'uses'        => 'Books@destroy' , 'as'          => 'books.destroy'
]);


