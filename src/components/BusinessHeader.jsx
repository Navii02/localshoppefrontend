import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { FaUser, FaStar, FaCog, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AddProject from "./AddProject";
import "./BusinessHeader.css";

function BusinessHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userdetails");
    navigate("/business/login");
  };

  return (
    <Navbar expand="lg" className="business-navbar shadow-sm">
      <Container>
        {/* Brand Name */}
        <Navbar.Brand className="navbar-brand-custom">
       <Link to="/business" className="text-decoration-none text-black">  <FaShoppingCart className="brand-icon" />
          Local Shoppee</Link> 
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/business/profile" className="custom-nav-link">
              <FaUser className="me-2" /> Profile
            </Nav.Link>

            {/* Products Dropdown */}
            <NavDropdown
              title={<span className="custom-dropdown-title"><FaStar className="me-2" /> Products</span>}
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/business/products">Details</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/business/reviews">Reviews</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/business/orders">
                <FaShoppingCart className="me-2" /> Orders
              </NavDropdown.Item>
            </NavDropdown>

            <AddProject />

            {/* Settings Dropdown */}
           
          </Nav>

          {/* Orders & Logout */}
          <Nav>
            <Nav.Link as={Link} to="/business/orders" className="custom-nav-link">
              <FaShoppingCart className="me-2" /> Orders
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className="custom-nav-link logout-link">
              <FaSignOutAlt className="me-2" /> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BusinessHeader;
