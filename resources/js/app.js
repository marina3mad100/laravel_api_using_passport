
window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
let token = document.head.querySelector('meta[name="csrf-token"]')

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')
}
require('./bootstrap');

import React from 'react'
import ReactDOM from 'react-dom'
import {  BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Index from './components/index'
import Login from './components/login'
import Register from './components/register'
import Home from './components/home'
import weather from './components/weather'

ReactDOM.render(
	<Router>
	    <Switch>
	    <Route exact path='/' component={Index}/>
	    <Route path='/login' component={Login}/>
	    <Route path='/register' component={Register}/>
	    <Route path='/home' component={Home}/>
		<Route path='/weather' component={weather} />
	</Switch>
	</Router>,
    document.getElementById('app')
);