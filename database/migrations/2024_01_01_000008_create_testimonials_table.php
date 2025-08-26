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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Customer name');
            $table->text('content')->comment('Testimonial content');
            $table->integer('rating')->default(5)->comment('Rating 1-5 stars');
            $table->string('location')->nullable()->comment('Customer location');
            $table->boolean('is_active')->default(true)->comment('Display status');
            $table->integer('sort_order')->default(0)->comment('Display order');
            $table->timestamps();
            
            $table->index('is_active');
            $table->index('sort_order');
            $table->index('rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};