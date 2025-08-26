<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWithdrawalRequest extends FormRequest
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
            'amount' => 'required|numeric|min:50000',
            'verification_code' => 'required|string|min:4|max:8',
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
            'amount.required' => 'Withdrawal amount is required.',
            'amount.numeric' => 'Withdrawal amount must be a number.',
            'amount.min' => 'Minimum withdrawal amount is Rp 50,000.',
            'verification_code.required' => 'Verification code is required.',
            'verification_code.min' => 'Verification code must be at least 4 characters.',
            'verification_code.max' => 'Verification code cannot exceed 8 characters.',
        ];
    }
}