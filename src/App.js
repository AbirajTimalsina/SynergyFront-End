import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MenuItem from './components/MenuItem';
import fastfood from './components/fastfood';
import regularfood from './components/regularfood';
import newDhishes from './components/newdishes';
import popularfood from './components/PopularFood';
import upcomingfood from './components/upcoming';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/" component={Login} />
					<Route exact path="/menuitem" component={MenuItem} />
					<Route exact path="/fastfood" component={fastfood} />
					<Route exact path = "/regularfood" component={regularfood} />
					<Route exact path = "/newdishes" component={newDhishes} />
					<Route exact path = "/popularfood" component={popularfood} />
					<Route exact path = "/upcomingfood" component={upcomingfood} />

				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
