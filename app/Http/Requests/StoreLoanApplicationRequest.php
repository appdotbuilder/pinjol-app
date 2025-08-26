<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLoanApplicationRequest extends FormRequest
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
            'amount' => 'required|numeric|min:500000|max:10000000',
            'term_months' => 'required|integer|in:1,3,6,12',
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
            'amount.required' => 'Loan amount is required.',
            'amount.numeric' => 'Loan amount must be a number.',
            'amount.min' => 'Minimum loan amount is Rp 500,000.',
            'amount.max' => 'Maximum loan amount is Rp 10,000,000.',
            'term_months.required' => 'Loan term is required.',
            'term_months.in' => 'Invalid loan term selected.',
        ];
    }
}