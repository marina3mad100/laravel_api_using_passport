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

class WeatherController extends Controller
{
    //
	protected $url = 'https://www.metaweather.com/api/location/';
    protected $client;

	public function weatherpage(){
		return view('weatherpage');
	}

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => $this->url,
            'timeout'  => 10.0,
        ]);
    }

    public function getWoeid($query){
		$response = $this->client->request('GET', 'search/?query='.$query);
		if($response->getStatusCode() == 200){
			$result = json_decode($response->getBody()->getContents());
	
			if (count($result) > 0){
				return $result[0]->woeid;
			}
			return 'No result found !';
		}
    }

    public function getWeather($query, $date = null){
        $woeid = $this->getWoeid($query);
        if (!is_numeric($woeid)){
            return $woeid;
        }
        if(!is_null($date)){
			$new_date = str_replace("-","/",$date);
            $woeid .= '/'.$new_date;
        }else{
			$date = date('Y-m-d');
			$new_date = str_replace("-","/",$date);
            $woeid .= '/'.$new_date;
		}
		
		// print($woeid);
		// return;
		
		$response = $this->client->request('GET', ''.$woeid);
	// print_r($response->getBody()->getContents());
	// return;
		//if($response->getStatusCode() == 200){
			return response()->json(['success'=>$response->getBody()->getContents()], $response->getStatusCode());
			//return  json_decode($response->getBody()->getContents());
		//}

    }
	
}
