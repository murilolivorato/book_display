<?php

use App\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

/* -------------------------------------------------------- BookCategory */
$factory->define(App\BookCategory::class, function (Faker $faker) {

    return [
        'title'           => $faker->unique()->word()
    ];
});


/* -------------------------------------------------------- BookCategory */
$factory->define(App\Book::class, function (Faker $faker) {
    return [
        'isbn'        => $faker->numberBetween(10000,80000) ,
        'author'      => $faker->name ,
        'price'       => $faker->numberBetween(100000,8000000) ,
        'title'       => $faker->sentence(5)
    ];
});