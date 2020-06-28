import React, { useState } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	Button,
	NavLink,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

export default function Nab() {
	let handleLogout = (e) => {
		localStorage.removeItem('logged');
		window.location = '/';
	};
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<Navbar color="light" light expand="md" style={{ marginBottom: 10 }}>
			<NavbarBrand href="/dashboard">GameEssential Admin Panal</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<Nav className="mr-auto" navbar>
					<NavItem>
						<NavLink href="/menuitem">Menu Item</NavLink>
					</NavItem>

					<UncontrolledDropdown nav inNavbar>
						<DropdownToggle nav caret>
							Product Control
						</DropdownToggle>
						<DropdownMenu right>
							<div>
								<DropdownItem>
									<a href="/#"> Product Creation</a>
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>
									<a href="/#">Product Data Control</a>
								</DropdownItem>
							</div>
						</DropdownMenu>
					</UncontrolledDropdown>
				</Nav>

				<Button onClick={handleLogout}>Logout</Button>
			</Collapse>
		</Navbar>
	);
}
