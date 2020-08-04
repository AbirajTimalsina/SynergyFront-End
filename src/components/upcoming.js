import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './include/Nab';
import UpcomingFoodCreate from './include/UpcomingFoodCreate';
import { Jumbotron, Table, Container, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, CustomInput, FormGroup, } from 'reactstrap';
import Axios from 'axios';


export default class MenuItem extends Component {
	constructor(props) {
		super(props);
		this.state = { showPopup: false };  
		this.state = {
			upcoming: [],
			currentupcomingfood:{},
			selectedFile: null,
		};
	}

	toggle = (e) => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    togglePopup() {  
        this.setState({  
             showPopup: !this.state.showPopup  
        });  
         } 

	handledelete = (propA) => (e) => {
		e.preventDefault();
		console.log(propA);
		axios
			.delete('http://localhost:3000/upcomingfood/' + propA)
			.then((response) => {
				window.location.reload(false);
			});
	};

	componentDidMount() {
		axios.get('http://localhost:3000/upcomingfood').then((response) => {
			this.setState({
				upcoming: response.data,
			});
		});
	}


	// for Updating Regular Food 

handleFileSelect = (e) => {
	this.setState({
		selectedFile: e.target.files[0]
	})
}

uploadFile = (e) => {
	e.preventDefault();
	const data = new FormData()
	console.log(this.state.selectedFile)
	data.append('image', this.state.selectedFile)
	Axios.post('http://localhost:3000/upload', data)
		.then((response) => {
			console.log(response.data)
			this.setState({
				currentupcomingfood: { ...this.state.currentupcomingfood, upcomingfoodpicture: response.data.filename }
			})
		}).catch((err) => console.log(err.response))
}

UpcomingFoodEdit = (upcomingfoodId) => {
    console.log(upcomingfoodId)

    this.setState({
        currentupcomingfood: this.state.upcoming.find((ucf) => {
            return ucf._id === upcomingfoodId
        })
    }, console.log(this.state.currentupcomingfood.name));
     this.toggle();
}
handleUpcomingFoodChange = (e) => {
	this.setState({
		currentupcomingfood: { ...this.state.currentupcomingfood, [e.target.name]: e.target.value }
	});
};

	///update events data by admin
	handleUpdate=(upcomingfoodId)=>{
		console.log(upcomingfoodId);
		// event.preventDefault();
		Axios.put(`http://localhost:3000/upcomingfood/${upcomingfoodId}`,this.state.currentupcomingfood)
		.then((response)=>{
			console.log(response.data)
			let updateupcomingfood= this.state.upcoming.map((editupcomingfood)=> {
				if(editupcomingfood._id === upcomingfoodId) {
					editupcomingfood = this.state.currentupcomingfood
				}
				return editupcomingfood
			})
			
			this.setState({
				upcoming: updateupcomingfood
			})
			this.toggle();
	
			// alert('user updated');
		})
	}

	render() {
		return (
			<div>
				<Navbar />
				<Jumbotron fluid>
					<Container>
					<h1 className="display-6"> Upcoming Food Control Center </h1>
						<UpcomingFoodCreate />
						<Table hover>
							<thead class="thead-dark">
								<tr>
									<th>Image</th>
									<th>Item Name</th>
									<th>Item Price</th>
									<th>Action</th>

									
								</tr>
							</thead>
							<tbody>
								{this.state.upcoming.map((item, i) => (
									<tr key={i}>
										<td>
											<img
												src={`http://localhost:3000/uploads/${item.upcomingfoodpicture}`}
												style={{ width: 50, height: 50 }}
											/>
										</td>
										<td>{item.upcomingfoodname}</td>
										<td>Rs. {item.upcomingfoodprice}</td>
										<td>
										<Button outline color="primary" onClick={()=>this.UpcomingFoodEdit(item._id)}>Update</Button>
										<br />
											{' '}
											<Button
												 outline color="danger" style={{ marginTop: 10 }} 
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


				<Modal  isOpen={this.state.isEdit} toggle={this.toggle}  >
                    <ModalHeader toggle={this.toggle}
                   
                    >
                        Edit Regular Food Details
                    </ModalHeader>
                    <ModalBody className="editoperation"  >
                        <FormGroup>
                            <Input name='upcomingfoodname' type='text'
                            value={this.state.currentupcomingfood.upcomingfoodname} 
                                onChange={this.handleUpcomingFoodChange}
                               
                                />
                        </FormGroup>
                        <FormGroup>
                            <Input name='upcomingfoodprice' type='text'
                            value={this.state.currentupcomingfood.upcomingfoodprice} 
                                onChange={this.handleUpcomingFoodChange}
                               />
                        </FormGroup>


                           <FormGroup>
                                <img className='img-thumbnail'
                                    width='200' src={`http://localhost:3000/uploads/${this.state.currentupcomingfood.upcomingfoodpicture}`}
                                    alt="Regular Food Pic" /><br />
                                <CustomInput type='file' id='profilePic '
									onChange={this.handleFileSelect} />
									<br/>
                                    <Button color='danger' onClick={this.uploadFile} block>Upload Picture</Button>
                            </FormGroup> 
                                                     
                    </ModalBody>  
                    <ModalFooter>
                        <Button color='primary' onClick={()=>this.handleUpdate(this.state.currentupcomingfood._id)}>
                            Update Information</Button>
                    </ModalFooter>
                </Modal>





			</div>
		);
	}
}
