<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Products;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::get('/product', 'ProductsController@index')->name('product.all');

// Route::post('/product', 'ProductsController@store')->name('product.store');

// Route::get('/product/{id}', 'ProductsController@show')->name('product.show');

// Route::post('/product/{id}', 'ProductsController@update')->name('product.update');

// Route::delete('/product/{id}', 'ProductsController@destory')->name('product.destroy');


Route::resource('/product', 'ProductsController');