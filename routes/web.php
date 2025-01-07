<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(\App\Http\Controllers\MainController::class)->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/contact-us', 'contact')->name('contact');
    Route::get('/section/{section}', 'section')->name('section');
    Route::post('/contact-us', 'contactCreate')->name('contact.create');
});
Route::get('/pdf/{id}', [\App\Http\Controllers\PDFController::class, 'show'])->name('pdf.load');
Route::get('/pdf/{id}', [\App\Http\Controllers\PDFController::class, 'index'])->name('pdf.index');
Route::get('/pdf/show/{id}', [\App\Http\Controllers\PDFController::class, 'streamPDF'])->name('pdf.stream');

Route::middleware('auth')->group(function (){
    Route::prefix('admin')->group(function () {

        Route::get('/commands', [\App\Http\Controllers\MainController::class, 'commands']);

        Route::controller(\App\Http\Controllers\LinkController::class)->group(function () {
            Route::post('/links/{link}', 'update')->name('links.update');
            Route::get('/links', 'index')->name('links.menu.get');
        });

        Route::controller(\App\Http\Controllers\SectionController::class)->group(function () {
            Route::get('/sections', 'index')->name('sections.index');
            Route::get('/sections/create', 'create')->name('sections.create');
            Route::post('/sections/store', 'store')->name('sections.store');
            Route::get('/sections/{section}/edit', 'edit')->name('sections.edit');
            Route::put('/sections/{section}', 'update')->name('sections.update');
            Route::delete('/sections/{section}', 'destroy')->name('sections.destroy');
        });

        Route::controller(\App\Http\Controllers\ImageController::class)->group(function () {
            Route::get('/sections/image/create/{id}', 'create')->name('sections.image.create');
            Route::post('/sections/image/store/{id}', 'store')->name('sections.image.store');
            Route::get('/sections/image/{image}/edit', 'edit')->name('sections.image.edit');
            Route::post('/sections/image/{image}', 'update')->name('sections.image.update');
            Route::delete('/sections/image/{image}', 'destroy')->name('sections.image.destroy');
        });

        Route::controller(\App\Http\Controllers\HomeController::class)->group(function () {
            Route::get('/home', 'index')->name('home.index');
            Route::get('/home/create', 'create')->name('home.create');
            Route::post('/home/store', 'store')->name('home.store');
            Route::get('/home/{home}/edit', 'edit')->name('home.edit');
            Route::post('/home/update', 'update')->name('home.update');
            Route::delete('/home/{home}', 'destroy')->name('home.destroy');
        });

        Route::controller(\App\Http\Controllers\ContactController::class)->group(function () {
            Route::get('/contact', 'index')->name('contact.index');
            Route::post('/contact', 'contactStore')->name('contact.update');
            Route::get('/info', 'infoIndex')->name('info.index');
            Route::post('/info/update', 'infoUpdate')->name('info.update');
            Route::get('/messages', 'message')->name('message.index');
            Route::delete('/messages/{id}', 'messageDestroy')->name('message.destroy');
        });

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    })->middleware(['auth']);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


require __DIR__ . '/auth.php';
