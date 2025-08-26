<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Testimonial;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        $banners = Banner::active()->orderBy('sort_order')->get();
        $testimonials = Testimonial::active()->orderBy('sort_order')->get();
        
        return Inertia::render('welcome', [
            'banners' => $banners,
            'testimonials' => $testimonials
        ]);
    }
}