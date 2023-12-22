<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'image.jpg',
            'path' => 'public/images/image.jpg',
            'title' => fake()->title(),
            'content' => fake()->text(),
            'date' => fake()->date(),
        ];
    }
}
