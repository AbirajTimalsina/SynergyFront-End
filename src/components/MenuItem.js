import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './include/Nab';
import { Jumbotron, Table, Button, Container } from 'reactstrap';
import ModalItemUpdate from './include/ModalItemUpdate';
import ModalItemCreate from './include/ModalItemCreate';

export default class MenuItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
		};
	}

	handledelete = (propA) => (e) => {
		e.preventDefault();
		console.log(propA);
		axios
			.delete('http://localhost:3000/item/delete' + propA)
			.then((response) => {
				window.location.reload(false);
			});
	};

	componentDidMount() {
		axios.get('http://localhost:3000/item/all').then((response) => {
			this.setState({
				items: response.data,
			});
		});
	}

	render() {
		return (
			<div>
				<Navbar />
				<Jumbotron fluid>
					<Container>
						<h1 className="display-3">MenuItem Control</h1>
						<ModalItemCreate />
						<Table>
							<thead>
								<tr>
									<th>Image</th>
									<th>Item Name</th>
									<th>Item Price</th>
									<th>Item Ingredient</th>
									<th>Update</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{this.state.items.map((item, i) => (
									<tr key={i}>
										<td>
											<img
												src={`http://localhost:3000/uploads/${item.itempicture}`}
												style={{ width: 50, height: 50 }}
											/>
										</td>
										<td>{item.itemname}</td>
										<td>{item.itemprice}</td>
										<td>{item.itemingredient}</td>
										<td>
											<ModalItemUpdate props={item} />
										</td>
										<td>
											{' '}
											<Button
												color="danger"
												onClick={this.handledelete(item._id)}
											>
												Delete
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Container>
				</Jumbotron>
			</div>
		);
	}
}
