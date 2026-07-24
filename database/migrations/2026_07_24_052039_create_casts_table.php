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
        Schema::create('casts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->mediumInteger('country_id')->unsigned()->nullable();
            $table->foreign('country_id')->references('id')->on('countries')->nullOnDelete();
            $table->string('profile_image')->nullable();
            $table->text('biography')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->unsignedInteger('gender')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('casts');
    }
};
