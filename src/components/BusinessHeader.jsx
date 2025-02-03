import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AddProject from './AddProject';
import './BusinessHeader.css'; // Custom styles
import { FaUser, FaStar, FaCog, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function BusinessHeader() {
  const navigate =useNavigate()
  const handleLogout=()=>{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userdetails');
    navigate("/business/login")
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="business-navbar">
        <Container>
          <Navbar.Brand className="navbar-brand-custom">
            <FaShoppingCart className="brand-icon" />
            Local Shoppee
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#profile" className="custom-nav-link">
                <FaUser className="me-2" /> Profile
              </Nav.Link>
              <NavDropdown
                title={<span className="custom-dropdown-title"><FaStar className="me-2" /> Products</span>}
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item href="/business/products">
                  Details
                </NavDropdown.Item>
                <NavDropdown.Item href="">
                  Reviews
                </NavDropdown.Item>
              </NavDropdown>
              <Nav>
                <AddProject />
              </Nav>
              <NavDropdown
                title={<span className="custom-dropdown-title"><FaCog className="me-2" /> Settings</span>}
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item href="#setting">
                  <FaCog className="me-2" /> Setting
                </NavDropdown.Item>
                <NavDropdown.Item href="#another-action">
                  <FaUser className="me-2" /> Another Action
                </NavDropdown.Item>
                <NavDropdown.Item href="#orders">
                  <FaShoppingCart className="me-2" /> Orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#logout">
                  <FaSignOutAlt className="me-2" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link className="custom-nav-link">
                <FaShoppingCart className="me-2" /><Link className='text-decoration-none text-black' to="/business/orders">Orders</Link>
              </Nav.Link>
              <Nav.Link eventKey={2} className="custom-nav-link" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default BusinessHeader;
