<?php

use Illuminate\Support\Facades\Route;

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
    return view('welcome');
});

Auth::routes();

Route::get('{path}','App\Http\Controllers\HomeController@index')->where( 'path' , '([A-z\d\-\/_.]+)?' );

Route::group(['middleware' => ['role:admin']], function () {
    //rutas accesibles solo para admin
    Route::post('add', 'App\Http\Controllers\PublicacionController@add');
    Route::post('edit/{id}', 'App\Http\Controllers\PublicacionController@edit');
    Route::delete('delete/{id}', 'App\Http\Controllers\PublicacionController@delete');
    Route::post('allpublicacion', 'App\Http\Controllers\PublicacionController@index');
   
});
//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
