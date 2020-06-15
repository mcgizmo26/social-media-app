// External Libraries **************************************************
import React from 'react';
// import { createStore, combineReducers } from 'redux';
// import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


// Project Imports *****************************************************
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';
import ResetPassword from './Pages/ResetPassword';


// Main Function to kick off project ***********************************
function App() {
	return (
		<Router>
			<Switch>
				<Route path="/app/home" component={Home} />
				<Route path="/app/profile" component={Profile} />
				<Route path="/app/settings" component={Settings} />
				<Route path="/login" component={Login} />
				<Route path="/resetpassword/" component={ResetPassword} />
				<Route path="/signup" component={Signup} />
				<Route path="/" component={Home} />
			</Switch>
		</Router>
	);
}

export default App;
