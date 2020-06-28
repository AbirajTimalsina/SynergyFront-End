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

export default function ModalItemUpdate(props) {
	const [modal, setmodal] = useState(false);
	const [items, setitems] = useState(props.props);
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
					_id: items._id,
					itemname: items.itemname,
					itemprice: items.itemprice,
					itemingredient: items.itemingredient,
					itempicture: response.data.filename,
				});
			})
			.catch((err) => console.log(err.response));
	};

	const update = (e) => {
		e.preventDefault();
		axios
			.put('http://localhost:3000/item/update', items)
			.then((response) => {
				toggle();
				window.location.reload(false);
			})
			.catch((err) => console.log(err.response));
	};

	return (
		<div>
			<Button color="primary" onClick={toggle}>
				Update
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Edit Item</ModalHeader>
				{/* toggle in modalheader gives x button */}
				<ModalBody>
					<Form
						action="?"
						method="post"
						style={{ width: '100%', margin: '0 auto' }}
					>
						<Col sm="12" md={{ size: 6, offset: 4 }} className="mb-3">
							<img
								src={`http://localhost:3000/uploads/${items.itempicture}`}
								style={{ width: 150, height: 150 }}
							/>
						</Col>
						<FormGroup row>
							<Label sm={3}> Item Name</Label>

							<Col sm={9}>
								<Input
									type="text"
									name="itemname"
									id="itemname"
									value={items.itemname}
									placeholder="Enter item name"
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
									value={items.itemprice}
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
									value={items.itemingredient}
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
					<Button color="info" onClick={update}>
						Save
					</Button>
					<Button color="danger" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}
