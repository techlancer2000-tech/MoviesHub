<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LanguageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare data before validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_active' => $this->boolean('is_active'),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'native_name' => [
                'nullable',
                'string',
                'max:255',
            ],

            'code' => [
                'required',
                'string',
                'max:10',
                Rule::unique('languages', 'code')
                    ->withoutTrashed()
                    ->ignore($this->route('language')),
            ],

            'locale' => [
                'nullable',
                'string',
                'max:20',
            ],

            'flag' => [
                $this->isMethod('post') ? 'required' : 'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp,svg',
                'max:2048', // 2 MB
            ],

            'is_active' => [
                'required',
                'boolean',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Language name is required.',
            'code.required' => 'Language code is required.',
            'code.unique' => 'This language code already exists.',

            'flag.required' => 'Please upload a flag image.',
            'flag.image' => 'The flag must be an image.',
            'flag.mimes' => 'The flag must be a JPG, PNG, WEBP, or SVG image.',
            'flag.max' => 'The flag image may not be greater than 2 MB.',

            'is_active.required' => 'Please select the language status.',
        ];
    }
}
