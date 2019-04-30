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




/* -----------------------------------------------------------------------------------  PRODUCT CATEGORY */


Route::post('vue-crud/store' , [
    'uses'        => 'Books@store' ,
    'as'          => 'vue_crud.store'

]);

Route::post('vue-crud/{id}/edit' , [
    'uses'        => 'Books@edit' ,
    'as'          => 'vue_crud.edit'
]);


Route::post('vue-crud/update' , [
    'uses'        => 'Books@update' ,
    'as'          => 'vue_crud.update'
]);

Route::post('vue-crud/delete' , [
    'uses'        => 'Books@delete' ,
    'as'          => 'vue_crud.delete'
]);


Route::get('vue-crud/load-display' , [
    'uses'        => 'Books@load_display' ,
    'as'          => 'vue_crud.load_display'
]);

Route::get('vue-crud' , [
    'uses'        => 'Books@index' ,
    'as'          => 'vue_crud'
]);