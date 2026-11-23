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
        $tables = [
            'photos'         => [['col' => 'user_id', 'ref' => 'users']],
            'comments'       => [['col' => 'user_id', 'ref' => 'users'], ['col' => 'photo_id', 'ref' => 'photos']],
            'reports'        => [['col' => 'user_id', 'ref' => 'users']],
            'galleries'      => [['col' => 'user_id', 'ref' => 'users']],
            'gallery_photos' => [['col' => 'photo_id', 'ref' => 'photos'], ['col' => 'gallery_id', 'ref' => 'galleries']],
            'likes'          => [['col' => 'photo_id', 'ref' => 'photos'], ['col' => 'user_id', 'ref' => 'users']],
            'images'         => [['col' => 'parent_id', 'ref' => 'photos'], ['col' => 'owner_id', 'ref' => 'users']],
            'follows'        => [['col' => 'follower_id', 'ref' => 'users'], ['col' => 'following_id', 'ref' => 'users']],
            'editing_tasks'  => [['col' => 'requester_id', 'ref' => 'users'], ['col' => 'editor_id', 'ref' => 'users']],
        ];

        foreach ($tables as $tableName => $relationships) {
            foreach ($relationships as $rel) {
                $column = $rel['col'];
                $referencedTable = $rel['ref'];

                $foreignKeys = array_filter(
                    Schema::getForeignKeys($tableName),
                    static fn (array $foreignKey): bool => in_array($column, $foreignKey['columns'], true)
                );
                $driver = DB::connection()->getDriverName();

                Schema::table($tableName, function (Blueprint $table) use ($foreignKeys, $column, $referencedTable, $driver) {
                    foreach ($foreignKeys as $fk) {
                        $table->dropForeign($driver === 'sqlite' ? $fk['columns'] : $fk['name']);
                    }

                    $table->foreign($column)
                        ->references('id')
                        ->on($referencedTable)
                        ->onDelete('cascade');
                });
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tables', function (Blueprint $table) {
            //
        });
    }
};
