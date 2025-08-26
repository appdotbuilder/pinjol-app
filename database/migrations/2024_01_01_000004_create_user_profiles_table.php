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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('phone')->unique()->comment('User phone number');
            $table->string('nik')->nullable()->comment('Indonesian ID number');
            $table->string('full_name')->nullable();
            $table->text('address')->nullable();
            $table->string('job')->nullable();
            $table->decimal('monthly_income', 12, 2)->nullable();
            $table->string('bank_name')->nullable();
            $table->string('bank_account')->nullable();
            $table->string('ktp_photo')->nullable()->comment('KTP photo path');
            $table->string('selfie_photo')->nullable()->comment('Selfie with KTP path');
            $table->string('signature')->nullable()->comment('Digital signature path');
            $table->boolean('is_verified')->default(false)->comment('Identity verification status');
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();
            
            $table->index('user_id');
            $table->index('phone');
            $table->index('is_verified');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};