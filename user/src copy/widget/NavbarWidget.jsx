import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarWidget({ handleLogout, role }) {
  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ms-auto">
            {role === "user" && (
              <>
                <Nav.Link as={Link} to="/home-user">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/history">
                  History
                </Nav.Link>
              </>
            )}
            {role === "staff" && (
              <>
                <Nav.Link as={Link} to="/home-staff">
                  Home
                </Nav.Link>
              </>
            )}
            {role === "admin" && (
              <>
                <Nav.Link as={Link} to="/home-admin">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/report">
                  Report
                </Nav.Link>
                <Nav.Link as={Link} to="/akun">
                  Akun
                </Nav.Link>
                <Nav.Link as={Link} to="/kuota">
                  Kuota
                </Nav.Link>
              </>
            )}
            <Button
              variant="warning"
              className="ms-4"
              onClick={handleLogoutClick}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarWidget;
