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

        if (!Schema::hasColumn($tableName, $column)) {
            return;
        }

        DB::table($tableName)
            ->whereNotExists(function ($query) use ($referencedTable) {
                $query->selectRaw('1')
                    ->from($referencedTable)
                    ->whereColumn("$referencedTable.id", "editing_tasks.request_id");
            })->delete();

        $foreignKeys = array_filter(
            Schema::getForeignKeys($tableName),
            static fn (array $foreignKey): bool => in_array($column, $foreignKey['columns'], true)
        );
        $driver = DB::connection()->getDriverName();

        Schema::table($tableName, function (Blueprint $table) use ($foreignKeys, $column, $referencedTable, $driver) {
            foreach ($foreignKeys as $foreignKey) {
                $table->dropForeign($driver === 'sqlite' ? $foreignKey['columns'] : $foreignKey['name']);
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
