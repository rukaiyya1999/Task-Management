import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" className="bg-dark navbar-dark" >
      <Container>
        <Navbar.Brand style={{ color: "white" }}>Task Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">
              <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
                Task List
              </Link>
            </Nav.Link>

            <Nav.Link href="#">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/addTask"}
              >
                Add task
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
