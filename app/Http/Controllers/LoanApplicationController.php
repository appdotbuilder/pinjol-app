<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLoanApplicationRequest;
use App\Models\LoanApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanApplicationController extends Controller
{
    /**
     * Store a newly created loan application.
     */
    public function store(StoreLoanApplicationRequest $request)
    {
        $user = $request->user();
        
        // Check if user profile is complete
        if (!$user->profile || !$user->profile->is_verified) {
            return redirect()->route('profile.verify')
                ->with('message', 'Please complete your identity verification first.');
        }

        $loanApplication = LoanApplication::create([
            'user_id' => $user->id,
            'amount' => $request->validated()['amount'],
            'term_months' => $request->validated()['term_months'],
        ]);

        return redirect()->route('wallet.index')
            ->with('success', 'Loan application submitted successfully. Please wait for approval.');
    }
}