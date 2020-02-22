<?php

use Illuminate\Http\Request;

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
Route::prefix('v1')->group(function(){
 Route::post('login', 'Api\AuthController@login');
 Route::post('register', 'Api\AuthController@register');

Route::middleware('auth:api')->group(function () {
	Route::post('logout','Api\AuthController@logout'); 
	
	Route::get('weatherpage','Api\WeatherController@weatherpage')->name('weatherpage');
	Route::get('weather/{query}/{date?}', 'Api\WeatherController@getWeather');
	Route::get('weatherapi/{query}', 'Api\WeatherApiController@getWeather');
 });
});


// Route::group([
    // 'prefix' => 'v1'
// ], function () {
    // Route::post('login', 'Api\AuthController@login')->name('login');
    // Route::post('register', 'Api\AuthController@register');
    // Route::group([
      // 'middleware' => 'auth:api'
    // ], function() {
        // Route::get('logout', 'Api\AuthController@logout');
    // });
// });




// Route::group(['middleware' => ['web']], function () {
    // Route::post('login','Auth\LoginController@login');  
    // Route::post('register','Auth\RegisterController@register');  
    // Route::post('logout','Auth\LoginController@logout');
    // Route::post('password/email','Auth\ForgotPasswordController@sendResetLinkEmail'); 
    // Route::post('password/reset','Auth\ResetPasswordController@reset');
       
// });


// Route::middleware('auth:api')->get('/user', function (Request $request) {
    // return $request->user();
// });
