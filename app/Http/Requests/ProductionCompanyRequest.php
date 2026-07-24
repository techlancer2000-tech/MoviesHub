<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductionCompanyRequest extends FormRequest
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
                Rule::unique('production_companies', 'slug')
                    ->withoutTrashed()
                    ->ignore($this->route('production_company')),
            ],

            'logo' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'description' => [
                'nullable',
                'string',
                'max:5000',
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
            'name.required' => 'Production company name is required.',
            'slug.required' => 'Production company slug is required.',
            'slug.unique' => 'This slug already exists.',

            'logo.image' => 'Please upload a valid image.',
            'logo.mimes' => 'The image must be a JPG, JPEG, PNG, or WEBP file.',
            'logo.max' => 'The image may not be larger than 2 MB.',

            'description.max' => 'Description may not exceed 5000 characters.',

            'is_active.required' => 'Please select the status.',
        ];
    }
}
