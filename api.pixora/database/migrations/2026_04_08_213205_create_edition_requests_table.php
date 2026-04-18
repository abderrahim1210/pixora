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
        Schema::create('edition_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('image_id'); //Id original image
            $table->unsignedBigInteger('requester_id'); //Id of user need a premission for download the image
            $table->unsignedBigInteger('owner_id'); //Id owner of the image
            $table->enum('status',['pending','approved','rejected'])->default('pending');
            $table->foreign('image_id')->references('id')->on('photos');
            $table->foreign('requester_id')->references('id')->on('users');
            $table->foreign('owner_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('edition_requests');
    }
};
