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
        Schema::create('artikel_category', function (Blueprint $table) {
            $table->primary(['artikel_id', 'category_id']);
            $table->unsignedBigInteger('artikel_id');
            $table->unsignedBigInteger('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artikel_category');
    }
};
