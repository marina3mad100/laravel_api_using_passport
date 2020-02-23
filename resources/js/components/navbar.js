window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
let token = document.head.querySelector('meta[name="csrf-token"]')

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')
}



import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'


class Nav extends Component {

	constructor(props){
		super(props);
	} 
  
	logout(e){
		e.preventDefault(); 
	   
		const username = ''
		const password = ''

		axios.post('api/v1/logout', {},{headers: { 'Authorization' : 'Bearer '+ localStorage.getItem('token')}})
		.then(response=> {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token'); 
			this.props.history.push('/');
		})
		.catch(error=> {
			console.log(error);
		});
	}
  
  handleClick(e){

    e.preventDefault();
    this.props.history.push('/');

  }
  render() {

    if (this.props.link) {
      return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#" onClick={this.handleClick.bind(this)}>Basic Authentication</a>
              </div>
              <ul className="nav navbar-nav navbar-right">
                 <a className="navbar-brand" href="#" onClick={this.logout.bind(this)}>{this.props.link}</a>  
              </ul>
          </div>
        </nav>
        )
    }
    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#" onClick ={this.handleClick.bind(this)}>Basic Authentication</a>
              </div>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </ul>
          </div>
        </nav>
      
    )
  }

}

export default  withRouter(Nav)