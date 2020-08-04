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
} from 'reactstrap';

export default function Nab() {
	let handleLogout = (e) => {
		localStorage.removeItem('logged');
		window.location = '/';
	};
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<Navbar class="text-secondary" light expand="md" style={{ marginBottom: 10, background:"indigo", color:"white" }}>
			<NavbarBrand href="/dashboard"   style={{background:"white", borderRadius:10, padding:10 }}> Admin Panal</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen}  style={{ color:"white" }} navbar>
			<Nav fill variant="tabs" className="mr-auto" color ='danger'>
			<NavItem >
			<NavLink  style={{ color:"white" }} href="/menuitem">Menu Item</NavLink>
			</NavItem>
			<NavItem>
			<NavLink  style={{ color:"white" }} href="/fastfood">Manage Fast Food</NavLink>
			</NavItem>
			<NavItem>
			<NavLink  style={{ color:"white" }} href="/regularfood">Manage Regular Food Details</NavLink>
			</NavItem>
			<NavItem>
			<NavLink  style={{ color:"white" }} href ="/popularfood">Manage Popluar Food</NavLink>
			</NavItem>
			<NavItem>
			<NavLink  style={{ color:"white" }} href ="/newdishes">Manage New Dishes Item</NavLink>
			</NavItem>
			<NavItem>
			<NavLink style={{ color:"white" }} href ="/upcomingfood">Manage Upcoming Food</NavLink>
			</NavItem>
		  </Nav>

				<Button  color ='danger'
				onClick={handleLogout}>Logout</Button>
			</Collapse>
		</Navbar>
	);
}
