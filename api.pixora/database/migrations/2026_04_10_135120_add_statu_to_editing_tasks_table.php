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
        Schema::table('editing_tasks', function (Blueprint $table) {
            DB::statement("ALTER TABLE editing_tasks MODIFY COLUMN status ENUM('pending','in_progress','completed') DEFAULT 'pending'");
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
