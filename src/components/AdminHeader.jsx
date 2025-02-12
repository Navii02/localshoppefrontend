import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import './AdminHeader.css'

function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate(`/admin/login`);
  };

  return (
    <Navbar expand="lg" className="bg-dark shadow-sm py-3">
      <Container>
        <Navbar.Brand>
          <Link className="text-decoration-none text-light fs-4 fw-bold" to="/admin">
            Local Shopee
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link>
              <Link className="nav-link-custom" to="/admin">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-link-custom" to="/admin/approval">Approvals</Link>
            </Nav.Link>
            <NavDropdown title={<span style={{ color: "white" }}>User</span>} id="basic-nav-dropdown" className="custom-dropdown">

              <NavDropdown.Item>
                <Link className="dropdown-item-custom" to="/admin/users">Normal Users</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="dropdown-item-custom" to="/admin/businessusers">Business Users</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </Container>
    </Navbar>
  );
}

export default AdminHeader;
