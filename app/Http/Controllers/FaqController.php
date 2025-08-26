<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\FaqArticle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    /**
     * Display the FAQ page.
     */
    public function index(Request $request)
    {
        $category = $request->get('category', 'general');
        
        $articles = FaqArticle::active()
            ->when($category !== 'all', function ($query) use ($category) {
                return $query->where('category', $category);
            })
            ->orderBy('sort_order')
            ->get();

        $categories = FaqArticle::active()
            ->select('category')
            ->distinct()
            ->pluck('category');

        return Inertia::render('faq/index', [
            'articles' => $articles,
            'categories' => $categories,
            'current_category' => $category
        ]);
    }
}