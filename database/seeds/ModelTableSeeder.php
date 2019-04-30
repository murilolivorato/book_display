<?php
/**
 * Created by PhpStorm.
 * User: murilo
 * Date: 29/04/2019
 * Time: 15:04
 */


use Illuminate\Database\Seeder;

use App\Classes\CreateDBSeed\CreateBookCategory;
use App\Classes\CreateDBSeed\CreateBook;

class ModelTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */



    /*-----   RUN */
    public function run()
    {
        $tasks = [
            CreateBookCategory::class ,
            CreateBook::class ,
        ];

        foreach ($tasks as $task){
            (new $task)->handle();
        }


    }
}
