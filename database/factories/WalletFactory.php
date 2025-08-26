<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Wallet>
 */
class WalletFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Wallet>
     */
    protected $model = Wallet::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $totalReceived = fake()->randomFloat(2, 0, 5000000);
        $totalWithdrawn = fake()->randomFloat(2, 0, $totalReceived);
        
        return [
            'user_id' => User::factory(),
            'balance' => $totalReceived - $totalWithdrawn,
            'total_received' => $totalReceived,
            'total_withdrawn' => $totalWithdrawn,
        ];
    }

    /**
     * Indicate that the wallet has a positive balance.
     */
    public function withBalance(): static
    {
        return $this->state(fn (array $attributes) => [
            'balance' => fake()->randomFloat(2, 100000, 2000000),
            'total_received' => fake()->randomFloat(2, 500000, 5000000),
            'total_withdrawn' => fake()->randomFloat(2, 0, 1000000),
        ]);
    }
}