import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Background from '../images/loginbackground.jpg';

import { Col, Form, FormGroup, Input, Button, Badge, Alert } from 'reactstrap';

const adminData = {
	fullname: 'admin admin',
	phonenumber: 'admin',
	email: 'admin@admin',
	password: 'admin',
	qa: {
		question: 'What is your secret key?',
		answer: 'admin',
	},
};
export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				phonenumber: '',
				password: '',
			},
			isloggedin: 'false',
		};
	}

	async componentDidMount() {
		axios
			.get('http://localhost:3000/users/profile/' + adminData.phonenumber)
			.then((response) => {
				if (!response.data) {
					axios
						.post('http://localhost:3000/users/signup', adminData)
						.then((response) => {
							console.log('admin was just created');
						})
						.catch((err) => console.log(err.response));
				}
			})
			.catch((err) => console.log(err.response));
	}

	handleChange = (e) => {
		this.setState({
			user: { ...this.state.user, [e.target.name]: e.target.value },
		});
	};

	submitForm = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:3000/users/login', this.state.user)
			.then((response) => {
				if (response.data.status === 'Successfully logged in') {
					localStorage.setItem('logged', 'redirect me');
					window.location = '/dashboard';
				}
			});

		if (!localStorage.getItem('logged')) {
			this.setState({ isloggedin: true });
		}
	};

	render() {
		if (localStorage.getItem('logged')) {
			return <Redirect to="/dashboard" />;
		}
		return (
			<div>
				<div className="container">
					{this.state.isloggedin === true ? (
						<Alert color="danger">Either username or password incorrect</Alert>
					) : (
						<div> </div>
					)}
					<div
						className="jumbotron"
						style={{
							height: 'fit-content',
							backgroundImage: 'url(' + Background + ')',
							backgroundSize: 'cover',
						}}
					>
						<Form>
							<FormGroup style={{ width: '50%', margin: '20px auto' }}>
								<div style={{ color: 'white' }}>
									<h1>LOGIN</h1>
									<h4>Username</h4>
								</div>
								<Input
									type="username"
									name="phonenumber"
									id="username"
									placeholder="username here..."
									onChange={this.handleChange}
								/>
								<h4 style={{ color: 'white' }}>Password</h4>
								<Input
									type="password"
									name="password"
									id="password"
									placeholder="password"
									//only give values if you want it there to seen like example in profile
									onChange={this.handleChange}
								/>

								{/* <FormFeedback>You will not be able to see this</FormFeedback> */}
								<Badge color="primary">
									Please enter your Login Information
								</Badge>
								<br />
								<Button
									color="secondary"
									size="lg"
									onClick={this.submitForm}
									style={{ marginTop: 10 }}
								>
									Log In
								</Button>
							</FormGroup>
						</Form>

						<hr style={{ border: '10', backgroundColor: '#ffffff' }} />
						<Col sm={6} style={{ margin: 'auto' }}></Col>
					</div>
				</div>
			</div>
		);
	}
}
