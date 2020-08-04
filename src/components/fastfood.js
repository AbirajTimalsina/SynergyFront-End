import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './include/Nab';
import { Jumbotron, Table, Container, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, CustomInput, FormGroup, } from 'reactstrap';
import Axios from 'axios';
import ModalFastFoodItemCreate from './include/FastfoodItemCreate';

export default class MenuItem extends Component {
	constructor(props) {
		super(props);
		this.state = { showPopup: false };  
		this.state = {
			fastfood: [],
			currentfastfood:{},
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
			.delete('http://localhost:3000/fastfood/' + propA)
			.then((response) => {
				window.location.reload(false);
			});
	};

	componentDidMount() {
		axios.get('http://localhost:3000/fastfood').then((response) => {
			this.setState({
				fastfood: response.data,
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
				currentfastfood: { ...this.state.currentfastfood, fastfoodpicture: response.data.filename }
			})
		}).catch((err) => console.log(err.response))
}


FastFoodEdit = (FastFoodId) => {
    console.log(FastFoodId)

    this.setState({
        currentfastfood: this.state.fastfood.find((rf) => {
            return rf._id === FastFoodId
        })
    }, console.log(this.state.currentfastfood.name));
     this.toggle();
}



handlefastFoodChange = (e) => {
		this.setState({
			currentfastfood: { ...this.state.currentfastfood, [e.target.name]: e.target.value }
		});
	};

	///update events data by admin
handleUpdate=(FastFoodId)=>{
    console.log(FastFoodId);
    // event.preventDefault();
    Axios.put(`http://localhost:3000/fastfood/${FastFoodId}`,this.state.currentfastfood)
    .then((response)=>{
        console.log(response.data)
        let updatefastfood = this.state.fastfood.map((editfastfood)=> {
            if(editfastfood._id === FastFoodId) {
                editfastfood = this.state.currentfastfood
            }
            return editfastfood
        })
        
        this.setState({
            fastfood: updatefastfood
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
					<h1 className="display-5"> Fast Food Control</h1>
						<ModalFastFoodItemCreate />
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
								{this.state.fastfood.map((item, i) => (
									<tr key={i}>
										<td>
											<img
												src={`http://localhost:3000/uploads/${item.fastfoodpicture}`}
												style={{ width: 50, height: 50 }}
											/>
										</td>
										<td>{item.fastfoodname}</td>
										<td>Rs. {item.fastfoodprice}</td>
										<td>
										<Button outline color="primary" onClick={()=>this.FastFoodEdit(item._id)}>Update</Button>
<br />
											{' '}
											<Button
												 outline color="danger"  style={{ marginTop: 10 }} 
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
                        Edit Fast Food Details
                    </ModalHeader>
                    <ModalBody className="editoperation"  >
                        <FormGroup>
                            <Input name='fastfoodname' type='text'
                            value={this.state.currentfastfood.fastfoodname} 
                                onChange={this.handlefastFoodChange}
                               
                                />
                        </FormGroup>
                        <FormGroup>
                            <Input name='fastfoodprice' type='text'
                            value={this.state.currentfastfood.fastfoodprice} 
                                onChange={this.handlefastFoodChange}
                               />
                        </FormGroup>


                           <FormGroup>
                                <img className='img-thumbnail'
                                    width='200' src={`http://localhost:3000/uploads/${this.state.currentfastfood.fastfoodpicture}`}
                                    alt="Regular Food Pic" /><br />
                                <CustomInput type='file' id='profilePic '
									onChange={this.handleFileSelect} />
									<br/>
                                    <Button color='danger' onClick={this.uploadFile} block>Upload Picture</Button>
                            </FormGroup> 
                                                     
                    </ModalBody>  
                    <ModalFooter>
                        <Button color='primary' onClick={()=>this.handleUpdate(this.state.currentfastfood._id)}>
                            Update Information</Button>
                    </ModalFooter>
                </Modal>


			</div>
		);
	}
}
