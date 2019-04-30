<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 17/03/2019
 * Time: 15:51
 */

namespace App\Classes\CreateDBSeed\DB;


class DBBookCategory
{
    protected static $start_db_data = [

      /* 1 */  ['title' => 'Linux' ] ,
      /* 2 */  ['title' => 'Javascript' ] ,
      /* 3 */  ['title' => 'PHP' ] ,
      /* 4 */  ['title' => 'CSS' ] ,
      /* 5 */  ['title' => 'HTML' ] ,
      /* 6 */  ['title' => 'MYSQL' ] ,



    ];



    public static function start_db() {
        return static::$start_db_data;
    }
}