<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserProfileRequest extends FormRequest
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
            'nik' => 'required|string|size:16|unique:user_profiles,nik,' . $this->user()->profile?->id,
            'full_name' => 'required|string|max:255',
            'address' => 'required|string',
            'job' => 'required|string|max:255',
            'monthly_income' => 'required|numeric|min:1000000',
            'bank_name' => 'required|string|max:255',
            'bank_account' => 'required|string|max:50',
            'ktp_photo' => 'required|image|mimes:jpeg,jpg,png|max:2048',
            'selfie_photo' => 'required|image|mimes:jpeg,jpg,png|max:2048',
            'signature' => 'required|image|mimes:jpeg,jpg,png|max:1024',
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
            'nik.required' => 'NIK is required.',
            'nik.size' => 'NIK must be exactly 16 digits.',
            'nik.unique' => 'This NIK is already registered.',
            'full_name.required' => 'Full name is required.',
            'address.required' => 'Address is required.',
            'job.required' => 'Job information is required.',
            'monthly_income.required' => 'Monthly income is required.',
            'monthly_income.min' => 'Minimum monthly income is Rp 1,000,000.',
            'bank_name.required' => 'Bank name is required.',
            'bank_account.required' => 'Bank account number is required.',
            'ktp_photo.required' => 'KTP photo is required.',
            'ktp_photo.image' => 'KTP photo must be an image.',
            'ktp_photo.max' => 'KTP photo size cannot exceed 2MB.',
            'selfie_photo.required' => 'Selfie with KTP is required.',
            'selfie_photo.image' => 'Selfie photo must be an image.',
            'selfie_photo.max' => 'Selfie photo size cannot exceed 2MB.',
            'signature.required' => 'Digital signature is required.',
            'signature.image' => 'Signature must be an image.',
            'signature.max' => 'Signature size cannot exceed 1MB.',
        ];
    }
}