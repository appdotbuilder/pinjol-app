<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserProfileRequest;
use App\Http\Requests\UpdateUserProfileRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display the user profile.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $profile = $user->profile;

        return Inertia::render('profile/index', [
            'user' => $user,
            'profile' => $profile
        ]);
    }

    /**
     * Show the identity verification form.
     */
    public function edit(Request $request)
    {
        $user = $request->user();
        $profile = $user->profile;

        return Inertia::render('profile/verify', [
            'user' => $user,
            'profile' => $profile
        ]);
    }

    /**
     * Store or update user profile and verification data.
     */
    public function store(StoreUserProfileRequest $request)
    {
        $user = $request->user();
        $validated = $request->validated();

        // Handle file uploads
        if ($request->hasFile('ktp_photo')) {
            $validated['ktp_photo'] = $request->file('ktp_photo')->store('documents', 'public');
        }

        if ($request->hasFile('selfie_photo')) {
            $validated['selfie_photo'] = $request->file('selfie_photo')->store('documents', 'public');
        }

        if ($request->hasFile('signature')) {
            $validated['signature'] = $request->file('signature')->store('signatures', 'public');
        }

        $validated['user_id'] = $user->id;

        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            $validated
        );

        return redirect()->route('profile.index')
            ->with('success', 'Profile updated successfully. Verification is pending admin approval.');
    }

    /**
     * Update user profile.
     */
    public function update(UpdateUserProfileRequest $request)
    {
        $user = $request->user();
        $validated = $request->validated();

        // Handle file uploads
        if ($request->hasFile('ktp_photo')) {
            $validated['ktp_photo'] = $request->file('ktp_photo')->store('documents', 'public');
        }

        if ($request->hasFile('selfie_photo')) {
            $validated['selfie_photo'] = $request->file('selfie_photo')->store('documents', 'public');
        }

        if ($request->hasFile('signature')) {
            $validated['signature'] = $request->file('signature')->store('signatures', 'public');
        }

        $validated['user_id'] = $user->id;

        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            $validated
        );

        return redirect()->route('profile.index')
            ->with('success', 'Profile updated successfully. Verification is pending admin approval.');
    }
}