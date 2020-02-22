<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\ServerException;
use GuzzleHttp\Exception\TooManyRedirectsException;

class WeatherApiController extends Controller
{
    //
	protected $url = 'http://api.weatherstack.com/current';
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    public function getWeather($query){
		$response = $this->client->request('GET', 'http://api.weatherstack.com/current', [
			'query' => ['access_key'=>'48935674b52f10dde6aaba81f318f1b4','query' =>$query]
		]);		
			// $result = ($response->getBody()->getContents());
			// print($result);
			// return;
				
			return response()->json(['success'=>$response->getBody()->getContents(),'code'=>$response->getStatusCode()], $response->getStatusCode());
		
    }

  
}

