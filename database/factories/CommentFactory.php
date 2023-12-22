<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => '40',
            'post_id' => '6',
            'content' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus alias quod sed eaque fuga ad sunt perferendis eum ratione? Temporibus, quam? Dignissimos ratione vel, cupiditate aliquid dicta perspiciatis iure quisquam?'
        ];
    }
}
