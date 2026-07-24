<?php

namespace Database\Seeders;

use App\Enums\Boolean;
use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = [
            [
                'name' => 'English',
                'native_name' => 'English',
                'code' => 'en',
                'locale' => 'en_US',
                'flag' => null,
            ],
            [
                'name' => 'Hindi',
                'native_name' => 'हिन्दी',
                'code' => 'hi',
                'locale' => 'hi_IN',
                'flag' => null,
            ],
            [
                'name' => 'Spanish',
                'native_name' => 'Español',
                'code' => 'es',
                'locale' => 'es_ES',
                'flag' => null,
            ],
            [
                'name' => 'French',
                'native_name' => 'Français',
                'code' => 'fr',
                'locale' => 'fr_FR',
                'flag' => null,
            ],
            [
                'name' => 'German',
                'native_name' => 'Deutsch',
                'code' => 'de',
                'locale' => 'de_DE',
                'flag' => null,
            ],
            [
                'name' => 'Japanese',
                'native_name' => '日本語',
                'code' => 'ja',
                'locale' => 'ja_JP',
                'flag' => null,
            ],
            [
                'name' => 'Korean',
                'native_name' => '한국어',
                'code' => 'ko',
                'locale' => 'ko_KR',
                'flag' => null,
            ],
            [
                'name' => 'Chinese',
                'native_name' => '中文',
                'code' => 'zh',
                'locale' => 'zh_CN',
                'flag' => null,
            ],
            [
                'name' => 'Arabic',
                'native_name' => 'العربية',
                'code' => 'ar',
                'locale' => 'ar_SA',
                'flag' => null,
            ],
            [
                'name' => 'Portuguese',
                'native_name' => 'Português',
                'code' => 'pt',
                'locale' => 'pt_PT',
                'flag' => null,
            ],
            [
                'name' => 'Russian',
                'native_name' => 'Русский',
                'code' => 'ru',
                'locale' => 'ru_RU',
                'flag' => null,
            ],
            [
                'name' => 'Tamil',
                'native_name' => 'தமிழ்',
                'code' => 'ta',
                'locale' => 'ta_IN',
                'flag' => null,
            ],
            [
                'name' => 'Telugu',
                'native_name' => 'తెలుగు',
                'code' => 'te',
                'locale' => 'te_IN',
                'flag' => null,
            ],
            [
                'name' => 'Malayalam',
                'native_name' => 'മലയാളം',
                'code' => 'ml',
                'locale' => 'ml_IN',
                'flag' => null,
            ],
            [
                'name' => 'Kannada',
                'native_name' => 'ಕನ್ನಡ',
                'code' => 'kn',
                'locale' => 'kn_IN',
                'flag' => null,
            ],
        ];

        foreach ($languages as $language) {
            Language::firstOrCreate(
                [
                    'code' => $language['code'],
                ],
                [
                    'name' => $language['name'],
                    'native_name' => $language['native_name'],
                    'code' => $language['code'],
                    'locale' => $language['locale'],
                    'flag' => $language['flag'],
                    'is_active' => Boolean::True,
                ]
            );
        }
    }
}
