<?php

namespace Database\Factories;

use App\Models\LoanApplication;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LoanApplication>
 */
class LoanApplicationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\LoanApplication>
     */
    protected $model = LoanApplication::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'amount' => fake()->randomFloat(2, 500000, 10000000),
            'term_months' => fake()->randomElement([1, 3, 6, 12]),
            'status' => fake()->randomElement(['pending', 'approved', 'rejected', 'disbursed']),
            'approved_amount' => null,
            'admin_notes' => null,
            'approved_at' => null,
            'disbursed_at' => null,
        ];
    }

    /**
     * Indicate that the loan application is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'approved_amount' => $attributes['amount'] * 0.9, // 90% of requested
            'approved_at' => fake()->dateTimeBetween('-1 week', 'now'),
            'admin_notes' => 'Application approved after verification.',
        ]);
    }

    /**
     * Indicate that the loan application is disbursed.
     */
    public function disbursed(): static
    {
        return $this->approved()->state(fn (array $attributes) => [
            'status' => 'disbursed',
            'disbursed_at' => fake()->dateTimeBetween($attributes['approved_at'], 'now'),
        ]);
    }
}