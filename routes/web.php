<?php

use App\Http\Controllers\CommentsController;
use App\Http\Controllers\Dashboard;
use App\Http\Controllers\Projects;
use App\Http\Controllers\ProjectUsersController;
use App\Http\Controllers\Tasks;
use App\Models\ProjectUsers;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [Dashboard::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::resource('/projects', Projects::class)->middleware(['auth', 'verified']);
Route::resource('/projectUsers', ProjectUsersController::class)->middleware(['auth', 'verified']);
Route::post('/projectUsers/searchUsers', [ProjectUsersController::class, 'getProjectUsers'])->middleware(['auth', 'verified']);


Route::post('/users/searchUsers', [ProjectUsersController::class, 'getAllUsers'])->middleware(['auth', 'verified']);
Route::resource('projects.tasks', Tasks::class)->middleware(['auth', 'verified']);
Route::resource('projects.tasks.comments', CommentsController::class)->middleware(['auth', 'verified']);




require __DIR__ . '/auth.php';