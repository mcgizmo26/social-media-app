// External Libraries **************************************************
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { composeWithDevTools } from "redux-devtools-extension";


// Project Imports *****************************************************
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';
import ResetPassword from './Pages/ResetPassword';
import ProtectedRoute from './Components/ProtectedRoute';
import userReducer from './store/reducers/user';


// Use to combine reduxers into a single object ************************
const rootReducer = combineReducers(
	{
		user: userReducer
	}
)



// Creates an instance of the redux store ******************************
const store = createStore(rootReducer, composeWithDevTools());



// Main Function to kick off project ***********************************
function App() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path="/" component={Login} />
					<ProtectedRoute exact path="/home" component={Home} />
					<ProtectedRoute exact path="/profile" component={Profile} />
					<ProtectedRoute exact path="/settings" component={Settings} />
					<ProtectedRoute exact path="/resetpassword/" component={ResetPassword} />
					<ProtectedRoute exact path="/signup" component={Signup} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
