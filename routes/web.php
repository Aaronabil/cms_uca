<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);

Route::get('/page/{slug}', [PageController::class, 'show'])->name('page.show');

Route::get('/sejarah-uca', function (){
    return Inertia::render('TentangUca/Sejarah');
});

Route::get('/sambutan-rektor', function (){
    return Inertia::render('TentangUca/SambutanRektor');
});

Route::get('/visi-misi-dan-tujuan', function (){
    return Inertia::render('TentangUca/VisiMisi');
});

Route::get('/fakultas/ekonomi-dan-bisnis-islam', function (){
    return Inertia::render('Akademik/Fakultas/FEBI');
});

Route::get('/fakultas/ilmu-keperawatan', function (){
    return Inertia::render('Akademik/Fakultas/FIK');
});

Route::get('/fakultas/tarbiyah-dan-ilmu-keguruan', function (){
    return Inertia::render('Akademik/Fakultas/FTIK');
});

Route::get('/fakultas/teknik', function (){
    return Inertia::render('Akademik/Fakultas/FT');
});

Route::get('/prodi/{slug}', function (){
    return Inertia::render('Akademik/Fakultas/Prodi');
});

Route::get('/newscoba', function (){
    return Inertia::render('News/Index');
});

Route::get('semua-berita', function (){
    return Inertia::render('News/SemuaBerita');
});

Route::get('/fasilitas-kampus', function (){
    return Inertia::render('FasilitasKampus/Index');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
