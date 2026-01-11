<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\StudyProgramController;
use App\Http\Controllers\FacultyController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ArticleController;

Route::get('/', [HomeController::class, 'index']);

Route::get('/news', [ArticleController::class, 'index'])->name('news.index'); // New route for all news
Route::get('/news/{slug}', [ArticleController::class, 'show'])->name('news.show'); // Detail news route

Route::get('/page/{slug}', [PageController::class, 'show'])->name('page.show');

Route::get('/prodi/{slug}', [StudyProgramController::class, 'show'])->name('prodi.show');

Route::get('/fakultas/{slug}', [FacultyController::class, 'show'])->name('faculty.show');

use App\Models\Page;

Route::get('/sejarah-uca', function () {
    $page = Page::where('slug', 'sejarah-uca')->where('status', 'published')->firstOrFail();
    return Inertia::render('TentangUca/Sejarah', [
        'page' => $page
    ]);
})->name('sejarah-uca');

Route::get('/sambutan-rektor', function (){
    $page = Page::where('slug', 'sambutan-rektor')->where('status', 'published')->first();
    return Inertia::render('TentangUca/SambutanRektor', [
        'page' => $page
    ]);
});

Route::get('/visi-misi-dan-tujuan', function (){
    $visiPage = Page::where('slug', 'visi-uca')->where('status', 'published')->firstOrFail();
    $misiPage = Page::where('slug', 'misi-uca')->where('status', 'published')->firstOrFail();

    return Inertia::render('TentangUca/VisiMisi', [
        'visiPage' => $visiPage,
        'misiPage' => $misiPage
    ]);
});

// Route::get('/newscoba', function (){ // Removed as per new '/news' route
//     return Inertia::render('News/Index');
// });

Route::get('semua-berita', function (){
    return redirect()->route('news.index'); // Redirect to the new /news route
});

Route::get('/fasilitas-kampus', function (){
    return Inertia::render('FasilitasKampus/Index');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');