import React, { useState } from 'react';
import axios from 'axios';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Col,
	Form,
	Alert,
	FormGroup,
	Label,
	FormText,
	Input,
} from 'reactstrap';

export default function ModalItemCreate() {
	const [modal, setmodal] = useState(false);
	const [items, setitems] = useState({});
	const toggle = () => {
		setmodal(!modal);
	};

	const handleChange = (e) => {
		setitems({ ...items, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		const data = new FormData();
		data.append('image', e.target.files[0]);
		axios
			.post('http://localhost:3000/upload', data)
			.then((response) => {
				setitems({
					itemname: items.itemname,
					itemprice: items.itemprice,
					itemingredient: items.itemingredient,
					itempicture: response.data.filename,
				});
			})
			.catch((err) => console.log(err.response));
	};

	const create = (e) => {
		e.preventDefault();
		console.log(items);
		axios
			.post('http://localhost:3000/item/', items)
			.then((response) => {
				toggle();
				window.location.reload(false);
			})
			.catch((err) => console.log(err.response));
	};

	return (
		<div>
			<Button className="Btn_Create" 
			outline color="success" 
			style={{ width: 150, marginLeft: 950 }} onClick={toggle}>
				Create Item
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Create Item</ModalHeader>
				{/* toggle in modalheader gives x button */}
				<ModalBody>
					<Form
						action="?"
						method="post"
						style={{ width: '100%', margin: '0 auto' }}
					>
						<FormGroup row>
							<Label sm={3}> Item Name</Label>

							<Col sm={9}>
								<Input
									type="text"
									name="itemname"
									id="itemname"
									placeholder="Enter item name"
									alt
									onChange={handleChange}
								></Input>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={3}> Item Price</Label>

							<Col sm={9}>
								<Input
									type="number"
									name="itemprice"
									id="itemprice"
									placeholder="Enter item price"
									onChange={handleChange}
								></Input>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={3}> Item ingredient</Label>

							<Col sm={9}>
								<Input
									type="textarea"
									name="itemingredient"
									id="itemingredient"
									placeholder="Enter item ingredient"
									onChange={handleChange}
								></Input>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="exampleFile" sm={3}>
								Profile Picture
							</Label>
							<Col sm={9}>
								<Alert color="primary">
									<Input
										type="file"
										name="itempicture"
										id="itempicture"
										onChange={handleFileChange}
									/>
									<FormText color="muted">
										Please select an image from your Device.
									</FormText>
								</Alert>
							</Col>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="info" onClick={create}>
						Create
					</Button>
					<Button color="danger" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}
