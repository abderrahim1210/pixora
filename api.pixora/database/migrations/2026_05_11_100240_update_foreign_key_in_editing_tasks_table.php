<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    public function up(): void
    {
        $tableName = 'editing_tasks';
        $column = 'request_id';
        $referencedTable = 'edition_requests';

        DB::table($tableName)
            ->whereNotExists(function ($query) use ($referencedTable) {
                $query->select(DB::raw(1))
                    ->from($referencedTable)
                    ->whereRaw("$referencedTable.id = editing_tasks.request_id");
            })->delete();

        $foreignKey = DB::select(
            "SELECT CONSTRAINT_NAME 
         FROM information_schema.KEY_COLUMN_USAGE 
         WHERE TABLE_SCHEMA = ? 
         AND TABLE_NAME = ? 
         AND COLUMN_NAME = ? 
         AND REFERENCED_TABLE_NAME IS NOT NULL",
            [env('DB_DATABASE'), $tableName, $column]
        );

        Schema::table($tableName, function (Blueprint $table) use ($foreignKey, $column, $referencedTable) {
            if (!empty($foreignKey)) {
                $table->dropForeign($foreignKey[0]->CONSTRAINT_NAME);
            }

            $table->foreign($column)
                ->references('id')
                ->on($referencedTable)
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('editing_tasks', function (Blueprint $table) {
            //
        });
    }
};
