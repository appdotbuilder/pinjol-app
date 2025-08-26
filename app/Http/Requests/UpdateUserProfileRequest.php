<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'phone' => 'required|string|regex:/^08[0-9]{8,11}$/|unique:user_profiles,phone,' . $this->user()->profile?->id,
            'nik' => 'sometimes|string|size:16|unique:user_profiles,nik,' . $this->user()->profile?->id,
            'full_name' => 'sometimes|string|max:255',
            'address' => 'sometimes|string',
            'job' => 'sometimes|string|max:255',
            'monthly_income' => 'sometimes|numeric|min:1000000',
            'bank_name' => 'sometimes|string|max:255',
            'bank_account' => 'sometimes|string|max:50',
            'ktp_photo' => 'sometimes|image|mimes:jpeg,jpg,png|max:2048',
            'selfie_photo' => 'sometimes|image|mimes:jpeg,jpg,png|max:2048',
            'signature' => 'sometimes|image|mimes:jpeg,jpg,png|max:1024',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'phone.required' => 'Phone number is required.',
            'phone.regex' => 'Phone number must start with 08 and be 10-13 digits long.',
            'phone.unique' => 'This phone number is already registered.',
            'nik.size' => 'NIK must be exactly 16 digits.',
            'nik.unique' => 'This NIK is already registered.',
            'monthly_income.min' => 'Minimum monthly income is Rp 1,000,000.',
            'ktp_photo.image' => 'KTP photo must be an image.',
            'ktp_photo.max' => 'KTP photo size cannot exceed 2MB.',
            'selfie_photo.image' => 'Selfie photo must be an image.',
            'selfie_photo.max' => 'Selfie photo size cannot exceed 2MB.',
            'signature.image' => 'Signature must be an image.',
            'signature.max' => 'Signature size cannot exceed 1MB.',
        ];
    }
}