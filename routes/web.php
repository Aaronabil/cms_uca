<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Index', [
    ]);
});

Route::get('/sambutan-rektor', function (){
    return Inertia::render('TentangUca/SambutanRektor');
});

Route::get('/visi-misi-dan-tujuan', function (){
    return Inertia::render('TentangUca/VisiMisi');
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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
