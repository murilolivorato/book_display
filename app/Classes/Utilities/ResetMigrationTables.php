<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 29/04/2019
 * Time: 15:40
 */
namespace App\Classes\Utilities;

class ResetMigrationTables
{
    protected static $toTruncate = [

        // BOOKS
        'book_categories' , 'books' , 'book_book_categories'
    ];



    public static function getAll() {
        return static::$toTruncate;
    }
}