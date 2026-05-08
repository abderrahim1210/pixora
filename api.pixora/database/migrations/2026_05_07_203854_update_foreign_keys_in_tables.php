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

                $foreignKeys = DB::select(
                    "SELECT CONSTRAINT_NAME 
                 FROM information_schema.KEY_COLUMN_USAGE 
                 WHERE TABLE_SCHEMA = ? 
                 AND TABLE_NAME = ? 
                 AND COLUMN_NAME = ? 
                 AND REFERENCED_TABLE_NAME IS NOT NULL",
                    [env('DB_DATABASE'), $tableName, $column]
                );

                Schema::table($tableName, function (Blueprint $table) use ($foreignKeys, $column, $referencedTable) {
                    foreach ($foreignKeys as $fk) {
                        $table->dropForeign($fk->CONSTRAINT_NAME);
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
