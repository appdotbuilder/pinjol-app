<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserProfile>
 */
class UserProfileFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\UserProfile>
     */
    protected $model = UserProfile::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'phone' => '08' . fake()->numerify('##########'),
            'nik' => fake()->numerify('################'),
            'full_name' => fake()->name(),
            'address' => fake()->address(),
            'job' => fake()->jobTitle(),
            'monthly_income' => fake()->randomFloat(2, 1000000, 15000000),
            'bank_name' => fake()->randomElement(['BCA', 'BNI', 'BRI', 'Mandiri', 'CIMB Niaga']),
            'bank_account' => fake()->numerify('##########'),
            'ktp_photo' => null,
            'selfie_photo' => null,
            'signature' => null,
            'is_verified' => false,
            'verified_at' => null,
        ];
    }

    /**
     * Indicate that the profile is verified.
     */
    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_verified' => true,
            'verified_at' => fake()->dateTimeBetween('-1 month', 'now'),
            'ktp_photo' => 'documents/ktp_' . fake()->uuid() . '.jpg',
            'selfie_photo' => 'documents/selfie_' . fake()->uuid() . '.jpg',
            'signature' => 'signatures/signature_' . fake()->uuid() . '.jpg',
        ]);
    }
}