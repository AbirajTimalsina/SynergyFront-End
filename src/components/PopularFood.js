import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './include/Nab';
import { Jumbotron, Table, Container, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, CustomInput, FormGroup, } from 'reactstrap';
import PopularFoodCreate from './include/PopularFoodCreate';
import Axios from 'axios';

export default class MenuItem extends Component {
	constructor(props) {
		super(props);
		this.state = { showPopup: false }; 
		this.state = {
			popularfood: [],
			currentpopularfood:{},
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
			.delete('http://localhost:3000/popularfood/' + propA)
			.then((response) => {
				window.location.reload(false);
			});
	};

	componentDidMount() {
		axios.get('http://localhost:3000/popularfood').then((response) => {
			this.setState({
				popularfood: response.data,
			});
		});
	}



// for Updating Popular Food 

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
				currentpopularfood: { ...this.state.currentpopularfood, popularfoodpicture: response.data.filename }
			})
		}).catch((err) => console.log(err.response))
}


PopularFoodEdit = (PopularFoodId) => {
    console.log(PopularFoodId)

    this.setState({
        currentpopularfood: this.state.popularfood.find((pf) => {
            return pf._id === PopularFoodId
        })
    }, console.log(this.state.currentpopularfood.name));
     this.toggle();
}



	handlePopularFoodChange = (e) => {
		this.setState({
			currentpopularfood: { ...this.state.currentpopularfood, [e.target.name]: e.target.value }
		});
	};

	///update events data by admin
handleUpdate=(popularfoodId)=>{
    console.log(popularfoodId);
    // event.preventDefault();
    Axios.put(`http://localhost:3000/popularfood/${popularfoodId}`,this.state.currentpopularfood)
    .then((response)=>{
        console.log(response.data)
        let updatepopularfood = this.state.popularfood.map((editpopularfood)=> {
            if(editpopularfood._id === popularfoodId) {
                editpopularfood = this.state.currentpopularfood
            }
            return editpopularfood
        })
        
        this.setState({
			popularfood: updatepopularfood
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
					<h1 className="display-6"> Popular Food Control Center </h1>
						<PopularFoodCreate />
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
								{this.state.popularfood.map((item, i) => (
									<tr key={i}>
										<td>
											<img
												src={`http://localhost:3000/uploads/${item.popularfoodpicture}`}
												style={{ width: 50, height: 50 }}
											/>
										</td>
										<td>{item.popularfoodname}</td>
										<td>Rs. {item.popularfoodprice}</td>
										<td>
										<Button outline color="primary" onClick={()=>this.PopularFoodEdit(item._id)}>Update</Button>
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
	Edit Popular Food Details
</ModalHeader>
<ModalBody className="editoperation"  >
	<FormGroup>
		<Input name='popularfoodname' type='text'
		value={this.state.currentpopularfood.popularfoodname} 
			onChange={this.handlePopularFoodChange}
		   
			/>
	</FormGroup>
	<FormGroup>
		<Input name='popularfoodprice' type='text'
		value={this.state.currentpopularfood.popularfoodprice} 
			onChange={this.handlePopularFoodChange}
		   />
	</FormGroup>


	   <FormGroup>
			<img className='img-thumbnail'
				width='200' src={`http://localhost:3000/uploads/${this.state.currentpopularfood.popularfoodpicture}`}
				alt="Regular Food Pic" /><br />
			<CustomInput type='file' id='profilePic '
				onChange={this.handleFileSelect} />
				<br/>
				<Button color='danger' onClick={this.uploadFile} block>Upload Picture</Button>
		</FormGroup> 
								 
</ModalBody>  
<ModalFooter>
	<Button color='primary' onClick={()=>this.handleUpdate(this.state.currentpopularfood._id)}>
		Update Information</Button>
</ModalFooter>
</Modal>



			</div>
		);
	}
}
