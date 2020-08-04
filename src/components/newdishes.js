import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './include/Nab';
import { Jumbotron, Table, Container, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, CustomInput, FormGroup, } from 'reactstrap';
import Axios from 'axios';
import ModalItemCreate from './include/NewdishesItemCreate';

export default class MenuItem extends Component {
	constructor(props) { 
		super(props);
		this.state = { showPopup: false }; 
		this.state = {
			newdishes: [],
			currentnewdishitem:{},
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
			.delete('http://localhost:3000/newdishesfood/' + propA)
			.then((response) => {
				window.location.reload(false);
			});
	};

	componentDidMount() {
		axios.get('http://localhost:3000/newdishesfood').then((response) => {
			this.setState({
				newdishes: response.data,
			});
		});
	}


// for Updating New Dishes Item 

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
				currentnewdishitem: { ...this.state.currentnewdishitem, newdishespicture: response.data.filename }
			})
		}).catch((err) => console.log(err.response))
}


NewDishitemEdit = (newdishitemId) => {
    console.log(newdishitemId)

    this.setState({
        currentnewdishitem: this.state.newdishes.find((nd) => {
            return nd._id === newdishitemId
        })
    }, console.log(this.state.currentnewdishitem.name));
     this.toggle();
}



handlenewdishitemChange = (e) => {
		this.setState({
			currentnewdishitem: { ...this.state.currentnewdishitem, [e.target.name]: e.target.value }
		});
	};

	///update events data by admin
handleUpdate=(newdishitemId)=>{
    console.log(newdishitemId);
    // event.preventDefault();
    Axios.put(`http://localhost:3000/newdishesfood/${newdishitemId}`,this.state.currentnewdishitem)
    .then((response)=>{
        console.log(response.data)
        let updatenewdishitem = this.state.newdishes.map((editnewdishitem)=> {
            if(editnewdishitem._id === newdishitemId) {
                editnewdishitem = this.state.currentnewdishitem
            }
            return editnewdishitem
        })
        
        this.setState({
            newdishes: updatenewdishitem
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
					<h1 className="display-6"> New Dishes Control Center </h1>
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
								{this.state.newdishes.map((item, i) => (
									<tr key={i}>
										<td>
											<img
												src={`http://localhost:3000/uploads/${item.newdishespicture}`}
												style={{ width: 50, height: 50 }}
											/>
										</td>
										<td>{item.newdishesname}</td>
										<td>Rs. {item.newdishesprice}</td>
										<td>
										<Button outline color="primary" onClick={()=>this.NewDishitemEdit(item._id)}>Update</Button>
										<br />

											{' '}
											<Button
												 outline color="danger" style={{ marginTop: 10 }} 
												onClick={this.handledelete(item._id)}
											>
												Delete
											</Button>
										</td>
										<td>
										
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
                        Edit New Dihses Item
                    </ModalHeader>
                    <ModalBody className="editoperation"  >
                        <FormGroup>
                            <Input name='newdishesname' type='text'
                            value={this.state.currentnewdishitem.newdishesname} 
                                onChange={this.handlenewdishitemChange}
                               
                                />
                        </FormGroup>
                        <FormGroup>
                            <Input name='newdishesprice' type='text'
                            value={this.state.currentnewdishitem.newdishesprice} 
                                onChange={this.handlenewdishitemChange}
                               />
                        </FormGroup>


                           <FormGroup>
                                <img className='img-thumbnail'
                                    width='200' src={`http://localhost:3000/uploads/${this.state.currentnewdishitem.newdishespicture}`}
                                    alt="Regular Food Pic" /><br />
                                <CustomInput type='file' id='profilePic '
									onChange={this.handleFileSelect} />
									<br/>
                                    <Button color='danger' onClick={this.uploadFile} block>Upload Picture</Button>
                            </FormGroup> 
                                                     
                    </ModalBody>  
                    <ModalFooter>
                        <Button color='primary' onClick={()=>this.handleUpdate(this.state.currentnewdishitem._id)}>
                            Update Information</Button>
                    </ModalFooter>
                </Modal>
			</div>
		);
	}
}
