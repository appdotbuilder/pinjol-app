<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Withdrawal;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Withdrawal>
 */
class WithdrawalFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Withdrawal>
     */
    protected $model = Withdrawal::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'amount' => fake()->randomFloat(2, 50000, 1000000),
            'verification_code' => fake()->numerify('####'),
            'status' => fake()->randomElement(['pending', 'processing', 'completed', 'failed']),
            'notes' => fake()->optional()->sentence(),
            'processed_at' => null,
        ];
    }

    /**
     * Indicate that the withdrawal is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'processed_at' => fake()->dateTimeBetween('-1 week', 'now'),
            'notes' => 'Withdrawal completed successfully.',
        ]);
    }

    /**
     * Indicate that the withdrawal is processing.
     */
    public function processing(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'processing',
            'processed_at' => fake()->dateTimeBetween('-2 days', 'now'),
            'notes' => 'Withdrawal is being processed by CS team.',
        ]);
    }
}