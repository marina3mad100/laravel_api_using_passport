<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use App\User; 
use Illuminate\Support\Facades\Auth; 
use Validator;
use App\Http\Resources\UserResource as UserResource;
use Lcobucci\JWT\Parser;
use DB;
class AuthController extends Controller
{
	public $successStatus = 200;
	  
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }	  
	public function register(Request $request) {    
		$validator = Validator::make($request->all(), 
		[ 
			'name' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => 'required|string|min:6',
		  'confirm_password' => 'required|same:password', 
		]);   
		if ($validator->fails()){     
		   return response()->json(['error'=>$validator->errors()], 401);
		}    
		$input = $request->all();  
		$input['password'] = bcrypt($input['password']);
		$user = User::create($input); 	 
		return response()->json([
			'user'  =>  $user, // <- we're sending the user info for frontend usage
			'token' =>  $user->createToken('authToken')->accessToken // <- token is generated and sent back to the front end
		]);		 
	// return response()->json(['success'=>new UserResource($user) , 'code'=>$this-> successStatus]); 
	}
	  
	   
	public function login(Request $request) {    
		$validator = Validator::make($request->all(), 
		[ 
			'email' => 'required|string|email|max:255',
			'password' => 'required|string|min:6',
		]);   
		if ($validator->fails()){     
		   return response()->json(['error'=>$validator->errors()], 401);
		}		
		if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
			$user = Auth::user(); 			
			return response()->json([
                'user'  =>  $user, // <- we're sending the user info for frontend usage
                'token' =>  $user->createToken('authToken')->accessToken // <- token is generated and sent back to the front end
            ]);			
			
			// return response()->json([new UserResource($user) ]); 
		} else{ 
			return response()->json(['error'=>'Unauthorised'], 401); 
		} 
	}
	public function logout(Request $request) {
   
		$value = $request->bearerToken();
        $id = (new Parser())->parse($value)->getHeader('jti');
		$token = $request->user()->tokens->find($id);
        $token->revoke();	
		return Response(['code' => 200, 'message' => 'You are successfully logged out'], 200);
	}
	

 }
