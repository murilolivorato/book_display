<?php

use Illuminate\Database\Seeder;
use App\Classes\Utilities\ResetMigrationTables;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // RESET ALL TABLES WHEN I MAKE DB SEED
        $this->resetTables();

        // START MODAL SEEDER
        $this->call(ModelTableSeeder::class);
    }

    // RESET TABLES
    public function resetTables(){
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        foreach (ResetMigrationTables::getAll() as $table){
            DB::table($table)->truncate();
        }
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
