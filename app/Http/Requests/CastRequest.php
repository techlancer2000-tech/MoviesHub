<?php

namespace App\Http\Requests;

use App\Enums\Gender;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CastRequest extends FormRequest
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

            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('casts', 'slug')
                    ->withoutTrashed()
                    ->ignore($this->route('cast')),
            ],

            'profile_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'biography' => [
                'nullable',
                'string',
                'max:5000',
            ],

            'date_of_birth' => [
                'nullable',
                'date',
                'before_or_equal:today',
            ],

            'gender' => [
                'nullable',
                Rule::in(
                    collect(Gender::cases())
                        ->pluck('value')
                        ->toArray()
                ),
            ],

            'country_id' => [
                'nullable',
                'integer',
                Rule::exists('countries', 'id'),
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
            'name.required' => 'Cast name is required.',
            'slug.required' => 'Cast slug is required.',
            'slug.unique' => 'This cast slug already exists.',

            'profile_image.image' => 'Please upload a valid image.',
            'profile_image.mimes' => 'The image must be a JPG, JPEG, PNG, or WEBP file.',
            'profile_image.max' => 'The image may not be larger than 2 MB.',

            'biography.max' => 'Biography may not exceed 5000 characters.',

            'date_of_birth.date' => 'Please enter a valid date of birth.',
            'date_of_birth.before_or_equal' => 'Date of birth cannot be in the future.',

            'gender.in' => 'Please select a valid gender.',

            'country_id.exists' => 'Please select a valid country.',

            'is_active.required' => 'Please select the cast status.',
        ];
    }
}
