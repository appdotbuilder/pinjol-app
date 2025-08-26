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
        Schema::create('faq_articles', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Article title');
            $table->text('content')->comment('Article content');
            $table->string('category')->default('general')->comment('Article category');
            $table->boolean('is_active')->default(true)->comment('Article visibility status');
            $table->integer('sort_order')->default(0)->comment('Display order');
            $table->timestamps();
            
            $table->index('category');
            $table->index('is_active');
            $table->index('sort_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faq_articles');
    }
};