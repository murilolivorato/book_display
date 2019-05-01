<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 01/05/2019
 * Time: 19:23
 */
namespace app\Classes\Helpers;
class SetQueries
{
    public static function  convertArray($item){
        $new_value = [];
        $arr_string = explode("-", $item);


        foreach ($arr_string as $str) {
            $str != "" ? array_push($new_value, $str) : "";
        }
        return $new_value;
    }
}