<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookBookCategories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('book_book_categories', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->integer('category_id')->unsigned()->index();
            $table->foreign('category_id')->references('id')->on('book_categories')->onDelete('cascade');

            $table->integer('book_id')->unsigned()->index();
            $table->foreign('book_id')->references('id')->on('books')->onDelete('cascade');

            $table->unique(['category_id','book_id']);
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('book_book_categories', function(Blueprint $table){
            $table->dropForeign('book_book_categories_category_id_foreign');
            $table->dropForeign('book_book_categories_book_id_foreign');
        });

        Schema::dropIfExists('book_book_categories');
    }
}
