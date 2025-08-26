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
        Schema::create('loan_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 12, 2)->comment('Loan amount requested');
            $table->integer('term_months')->comment('Loan term in months');
            $table->enum('status', ['pending', 'approved', 'rejected', 'disbursed', 'completed', 'default'])->default('pending');
            $table->decimal('approved_amount', 12, 2)->nullable()->comment('Admin approved amount');
            $table->text('admin_notes')->nullable()->comment('Admin notes for approval/rejection');
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('disbursed_at')->nullable();
            $table->timestamps();
            
            $table->index('user_id');
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loan_applications');
    }
};