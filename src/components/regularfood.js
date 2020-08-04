import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './include/Nab';
import ModalItemCreate from './include/RegularFoodItemCreate';
import { Jumbotron, Table, Container, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, CustomInput, FormGroup, } from 'reactstrap';
import Axios from 'axios';

export default class MenuItem extends Component {
	constructor(props) {
		super(props);
		this.state = { showPopup: false };  
		this.state = {
			regularfood: [],
			currentregularfood:{},
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
			.delete('http://localhost:3000/regularfood/' + propA)
			.then((response) => {
				window.location.reload(false);
			});
	};

	componentDidMount() {
		axios.get('http://localhost:3000/regularfood').then((response) => {
			this.setState({
				regularfood: response.data,
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
				currentregularfood: { ...this.state.currentregularfood, regularfoodpicture: response.data.filename }
			})
		}).catch((err) => console.log(err.response))
}


RegularFoodEdit = (RegularFoodId) => {
    console.log(RegularFoodId)

    this.setState({
        currentregularfood: this.state.regularfood.find((rf) => {
            return rf._id === RegularFoodId
        })
    }, console.log(this.state.currentregularfood.name));
     this.toggle();
}



	handleRegularFoodChange = (e) => {
		this.setState({
			currentregularfood: { ...this.state.currentregularfood, [e.target.name]: e.target.value }
		});
	};

	///update events data by admin
handleUpdate=(regularfoodId)=>{
    console.log(regularfoodId);
    // event.preventDefault();
    Axios.put(`http://localhost:3000/regularfood/${regularfoodId}`,this.state.currentregularfood)
    .then((response)=>{
        console.log(response.data)
        let updateregularfood = this.state.regularfood.map((editregularfood)=> {
            if(editregularfood._id === regularfoodId) {
                editregularfood = this.state.currentregularfood
            }
            return editregularfood
        })
        
        this.setState({
            regularfood: updateregularfood
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
					<h1 className="display-6"> Regular Food Control Center </h1>
						<ModalItemCreate />
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
								{this.state.regularfood.map((item, i) => (
									<tr key={i}>
										<td>
											<img
												src={`http://localhost:3000/uploads/${item.regularfoodpicture}`}
												style={{ width: 50, height: 50 }}
											/>
										</td>
										<td>{item.regularfoodname}</td>
										<td>Rs. {item.regularfoodprice}</td>
										<td>
										<Button outline color="primary" onClick={()=>this.RegularFoodEdit(item._id)}>Update</Button>
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
                            <Input name='regularfoodname' type='text'
                            value={this.state.currentregularfood.regularfoodname} 
                                onChange={this.handleRegularFoodChange}
                               
                                />
                        </FormGroup>
                        <FormGroup>
                            <Input name='regularfoodprice' type='text'
                            value={this.state.currentregularfood.regularfoodprice} 
                                onChange={this.handleRegularFoodChange}
                               />
                        </FormGroup>


                           <FormGroup>
                                <img className='img-thumbnail'
                                    width='200' src={`http://localhost:3000/uploads/${this.state.currentregularfood.regularfoodpicture}`}
                                    alt="Regular Food Pic" /><br />
                                <CustomInput type='file' id='profilePic '
									onChange={this.handleFileSelect} />
									<br/>
                                    <Button color='danger' onClick={this.uploadFile} block>Upload Picture</Button>
                            </FormGroup> 
                                                     
                    </ModalBody>  
                    <ModalFooter>
                        <Button color='primary' onClick={()=>this.handleUpdate(this.state.currentregularfood._id)}>
                            Update Information</Button>
                    </ModalFooter>
                </Modal>
			</div>
		);
	}
}
