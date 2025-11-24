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
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
        });

        Schema::table('pages', function (Blueprint $table) {
            $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::table('artikel', function (Blueprint $table) {
            $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('featured_image_id')->references('id')->on('artikel_images')->onDelete('set null');
        });

        Schema::table('artikel_images', function (Blueprint $table) {
            $table->foreign('artikel_id')->references('id')->on('artikel')->onDelete('cascade');
        });

        Schema::table('comment', function (Blueprint $table) {
            $table->foreign('artikel_id')->references('id')->on('artikel')->onDelete('cascade');
        });

        Schema::table('study_programs', function (Blueprint $table) {
            $table->foreign('faculty_id')->references('id')->on('faculties')->onDelete('cascade');
        });

        Schema::table('lecturers', function (Blueprint $table) {
            $table->foreign('study_program_id')->references('id')->on('study_programs')->onDelete('set null');
        });

        Schema::table('menus', function (Blueprint $table) {
            $table->foreign('parent_id')->references('id')->on('menus')->onDelete('cascade');
        });

        Schema::table('artikel_category', function (Blueprint $table) {
            $table->foreign('artikel_id')->references('id')->on('artikel')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
        });

        Schema::table('pages', function (Blueprint $table) {
            $table->dropForeign(['users_id']);
        });

        Schema::table('artikel', function (Blueprint $table) {
            $table->dropForeign(['users_id']);
            $table->dropForeign(['featured_image_id']);
        });

        Schema::table('artikel_images', function (Blueprint $table) {
            $table->dropForeign(['artikel_id']);
        });

        Schema::table('comment', function (Blueprint $table) {
            $table->dropForeign(['artikel_id']);
        });

        Schema::table('study_programs', function (Blueprint $table) {
            $table->dropForeign(['faculty_id']);
        });

        Schema::table('lecturers', function (Blueprint $table) {
            $table->dropForeign(['study_program_id']);
        });

        Schema::table('menus', function (Blueprint $table) {
            $table->dropForeign(['parent_id']);
        });

        Schema::table('artikel_category', function (Blueprint $table) {
            $table->dropForeign(['artikel_id']);
            $table->dropForeign(['category_id']);
        });
    }
};
