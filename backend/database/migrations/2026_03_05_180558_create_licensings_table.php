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
        Schema::disableForeignKeyConstraints();
        Schema::create('licensings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('photo_id');
            $table->enum('license_type',['public','editorial','commercial','private']);
            $table->decimal('price',10,2);
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('licensings');
    }
};
