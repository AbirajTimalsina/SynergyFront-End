import React, { Component } from 'react';
import Navbar from './include/Nab';
import { Jumbotron, Table, Container, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, CustomInput, FormGroup, } from 'reactstrap';
import Axios from 'axios';

export default class Dashboard extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<p>
			
				<Modal>
                    <ModalHeader >
                        Edit Fast Food Details
                    </ModalHeader>
                    <ModalBody className="editoperation"  >
                        <FormGroup>
                            <Input name='fastfoodname' type='text'
                            value="aaa"/>
                        </FormGroup>                                  
                    </ModalBody>  
                    <ModalFooter>
                        <Button color='primary'>
                            Update Information</Button>
                    </ModalFooter>
                </Modal>
				
				</p>
				</div>

		);
	}
}
