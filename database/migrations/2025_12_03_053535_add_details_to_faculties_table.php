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
        Schema::table('faculties', function (Blueprint $table) {
            $table->string('color')->nullable()->after('slug');
            $table->text('description')->nullable()->after('color');
            $table->text('visi')->nullable()->after('description');
            $table->json('misi')->nullable()->after('visi');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('faculties', function (Blueprint $table) {
            $table->dropColumn(['color', 'description', 'visi', 'misi']);
        });
    }
};
