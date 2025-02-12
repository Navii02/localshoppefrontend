/* eslint-disable react/prop-types */
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";

function UserHeader({setSearchTerm}) {
  const navigate =useNavigate()

  const handleLogout=()=>{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userdetails');
    sessionStorage.removeItem('savedLocation');
    window.location.reload();
    navigate("/")

  }
  const handleClick =()=>{
    if(sessionStorage.getItem('token')){
      navigate("/profile")
    }else{
      navigate('/login')
    }

  }
  return (
    <Navbar fixed="top" expand="lg" style={{ background: "#354F52", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <Container fluid className="mt-2 mb-2">
        {/* Navbar Brand */}
        <Navbar.Brand aria-label="Home">
          <Link className="text-decoration-none text-white fs-4 fw-bold" to={"/"}>
            Local Shoppee
          </Link>
        </Navbar.Brand>

        {/* Navbar Toggle for Mobile */}
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          {/* Centered Search Bar */}
          <div className="d-flex w-100 justify-content-center">
            <Form className="d-flex" style={{ maxWidth: "400px", width: "100%" }}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                style={{
                  borderRadius: "20px",
                  border: "1px solid #ccc",
                  padding: "8px 15px",
                  boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                onChange={(e) => setSearchTerm(e.target.value)}

              />
            </Form>
          </div>

          {/* Right-Aligned Items */}
          <Nav className="ms-auto d-flex align-items-center">
            {/* Profile Dropdown */}
            <NavDropdown
              title={<span className="text-black">Profile</span>}
              id="navbarScrollingDropdown"
              className="me-3 text-white"
            >
              <NavDropdown.Item>
                <div className="text-decoration-none text-dark" onClick={handleClick}>
                  Profile
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="text-decoration-none text-dark" to={"/user/wishlist"}>
                  Wishlist
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="text-decoration-none text-dark" to={"/user/orders"}>
                  Orders
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="text-dark" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link aria-label="Cart" className="me-4">
            <Link className="text-decoration-none text-black" to={"/user/wishlist"}>
                  Wishlist
                </Link>
            </Nav.Link>

            {/* Cart Icon */}
            <Nav.Link aria-label="Cart" className="me-4">
              <Link to={"/cart"} className="text-decoration-none text-white">
                <FontAwesomeIcon icon={faCartShopping} size="xl" />
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserHeader;
