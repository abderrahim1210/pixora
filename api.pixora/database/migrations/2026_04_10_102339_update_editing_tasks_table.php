<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('editing_tasks', function (Blueprint $table) {
            // $table->unsignedBigInteger('request_id');
            // $table->foreign('request_id')->references('id')->on('edition_requests');
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
