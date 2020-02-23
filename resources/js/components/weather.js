window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
let token = document.head.querySelector('meta[name="csrf-token"]')

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')
}

import React, { Component } from 'react'
import Nav from './navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'





class Weather extends Component {
    
     constructor(props){
        super(props);
        this.state = {
			query:'',
			temperature:'',
			result :{},
			locations :{},
        }
     }

     onSubmit(e){
        e.preventDefault();
		const {query ,temperature, result , locations} = this.state ;
		    this.setState({
				result : {},
				locations:{},
				temperature : ''
			})

		axios.post('api/v1/weatherapi', {
            query, 
          },{headers: { 'Authorization' : 'Bearer '+ localStorage.getItem('token')}})
          .then(response=> {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');			  
            this.setState({err: false,
				result : response.data.current,
				locations: response.data.location,
				temperature : response.data.current.temperature
			});

			
            
          })
          .catch(error=> {
            // this.refs.email.value="";
            // this.refs.password.value="";
            this.setState({err: true});
          });
     }

     onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
     }

	render() {
		
 		const {query ,temperature , result , locations} = this.state ;
       // console.log(locations);
        let error = this.state.err ;
        let msg = (!error) ? 'Processing Successful' : 'no available' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
	    return (
            <div >
                <Nav link="Logout" />  
				
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-heading">Weather</div>
                                <div className="panel-body">   
                                    <div className="col-md-offset-2 col-md-8 col-md-offset-2">
                                        {error != undefined && <div className={name} role="alert">{msg}</div>}
                                    </div>  
                                    <form className="form-horizontal" role="form" method="Post" onSubmit= {this.onSubmit.bind(this)}>
                                        <div className="form-group">
                                            <label htmlFor="query" className="col-md-4 control-label">Country</label>

                                            <div className="col-md-6">
                                                <input id="query" type="text" ref="query" className="form-control" name="query"  onChange={this.onChange.bind(this)} required />
                                            </div>
										</div>	
											<div className="form-group">
												<div className="col-md-8 col-md-offset-4">
													<button type="submit" className="btn btn-primary">
														Get Weather
													</button>                                             
												</div>
											</div>											

                                    </form>
										<div className="row">
										<div className="form-group">
											<table border="1">
												<thead>
												</thead>
												
												<tbody>
													<tr>
														<td>Country</td>
														<td>{locations.country}</td>
													</tr>
													<tr>
														<td>Region</td>
														<td>{locations.region}</td>
													</tr>													
													<tr>
														<td>Observation Time</td>
														<td>{result.observation_time}</td>
													</tr>
													
													<tr>
														<td>Icon</td>
														<td><img src={result.weather_icons}/></td>
													</tr>

													<tr>
														<td>Temperature</td>
														<td>{result.temperature}</td>
													</tr>

													<tr>
														<td>Description</td>
														<td>{result.weather_descriptions}</td>
													</tr>

													<tr>
														<td>Wind Dir</td>
														<td>{result.wind_dir}</td>
													</tr>
													<tr>
														<td>Wind Speed</td>
														<td>{result.wind_speed}</td>
													</tr>

													<tr>
														<td>Wind Degree</td>
														<td>{result.wind_degree}</td>
													</tr>

													<tr>
														<td>Pressure</td>
														<td>{result.pressure}</td>
													</tr>


													<tr>
														<td>Cloud Cover</td>
														<td>{result.cloudcover}</td>
													</tr>	

													<tr>
														<td>Cloud Cover</td>
														<td>{result.cloudcover}</td>
													</tr>
		

													<tr>
														<td>Humidity</td>
														<td>{result.humidity}</td>
													</tr>
													<tr>
														<td>visibility</td>
														<td>{result.visibility}</td>
													</tr>
												</tbody>	
											</table>
										</div>
								
										
										</div>
																	
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
	);
}
}

export default Weather;

