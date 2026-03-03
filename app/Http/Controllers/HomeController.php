<?php

namespace App\Http\Controllers;

use App\Services\HomeService;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __construct(protected HomeService $homeService) {}

    public function index()
    {
        return Inertia::render('Index', [
            'sambutanRektor' => $this->homeService->getSambutanRektor(),
            'faculties' => $this->homeService->getFacultiesData(),
            'articles' => $this->homeService->getLatestArticles(10),
            'faqs' => $this->homeService->getFaqs(),
        ]);
    }
}
