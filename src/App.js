import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MenuItem from './components/MenuItem';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/" component={Login} />
					<Route exact path="/menuitem" component={MenuItem} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
