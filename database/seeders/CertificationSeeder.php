<?php

namespace Database\Seeders;

use App\Enums\Boolean;
use App\Models\Certification;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CertificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $certifications = [
            [
                'name' => 'U',
                'description' => 'Unrestricted public exhibition. Suitable for all age groups.',
            ],
            [
                'name' => 'UA',
                'description' => 'Parental guidance recommended for children below a certain age.',
            ],
            [
                'name' => 'A',
                'description' => 'Restricted to adults only (18 years and above).',
            ],
            [
                'name' => 'S',
                'description' => 'Restricted to a specific group of people such as doctors or professionals.',
            ],
            [
                'name' => 'G',
                'description' => 'General audience rating suitable for all ages.',
            ],
            [
                'name' => 'PG',
                'description' => 'Parental guidance suggested for younger viewers.',
            ],
            [
                'name' => 'PG-13',
                'description' => 'Parents strongly cautioned. Some material may be inappropriate for children under 13.',
            ],
            [
                'name' => 'R',
                'description' => 'Restricted. Viewers under 17 require accompanying parent or adult guardian.',
            ],
            [
                'name' => 'NC-17',
                'description' => 'No one 17 and under admitted.',
            ],
        ];

        foreach ($certifications as $certification) {
            Certification::firstOrCreate(
                [
                    'code' => Str::slug($certification['name']),
                ],
                [
                    'name' => $certification['name'],
                    'code' => Str::slug($certification['name']),
                    'description' => $certification['description'],
                    'is_active' => Boolean::True,
                ]
            );
        }
    }
}
