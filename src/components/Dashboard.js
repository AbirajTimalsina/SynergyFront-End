import React, { Component } from 'react';
import Navbar from './include/Nab';
import AdminRestrict from './include/AdminRestrict';

export default class Dashboard extends Component {
	render() {
		return (
			<div>
				<AdminRestrict />
				<Navbar />
			</div>
		);
	}
}
