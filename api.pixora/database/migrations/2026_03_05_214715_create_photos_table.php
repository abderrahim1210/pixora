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
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('category_id');
            $table->string('title',255);
            $table->text('description');
            $table->enum('type',['free','licensed'])->default('free');
            $table->string('filename',355);
            $table->enum('visibilty',['public','private'])->default('private');
            $table->string('location',455);
            $table->integer('width');
            $table->integer('height');
            $table->string('ratio',10);
            $table->decimal('size',6,0);
            $table->string('orientation',20);
            $table->text('tags');
            $table->enum('status',['pending','approved','rejected'])->default('pending');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('category_id')->references('id')->on('categories');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('photos');
    }
};
