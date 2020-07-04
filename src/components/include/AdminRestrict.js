import React from 'react';
import { Redirect } from 'react-router-dom';

export default function AdminRestrict() {
	if (!localStorage.getItem('logged')) {
		return <Redirect to="/" />;
	}
	return <div></div>;
}
