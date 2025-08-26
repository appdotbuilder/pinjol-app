<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWithdrawalRequest;
use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WalletController extends Controller
{
    /**
     * Display the wallet page.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $wallet = $user->wallet()->firstOrCreate([]);
        $recentWithdrawals = $user->withdrawals()->latest()->take(5)->get();

        return Inertia::render('wallet/index', [
            'wallet' => $wallet,
            'recent_withdrawals' => $recentWithdrawals,
            'whatsapp_cs' => '+6281234567890' // Customer service WhatsApp number
        ]);
    }

    /**
     * Store a new withdrawal request.
     */
    public function store(StoreWithdrawalRequest $request)
    {
        $user = $request->user();
        $wallet = $user->wallet()->firstOrCreate([]);
        
        $amount = $request->validated()['amount'];
        
        if ((float)$wallet->getAttribute('balance') < $amount) {
            return back()->withErrors(['amount' => 'Insufficient balance']);
        }

        $withdrawal = Withdrawal::create([
            'user_id' => $user->id,
            'amount' => $amount,
            'verification_code' => $request->validated()['verification_code'],
        ]);

        return redirect()->route('wallet.index')
            ->with('success', 'Withdrawal request submitted. Our CS team will contact you shortly.');
    }
}