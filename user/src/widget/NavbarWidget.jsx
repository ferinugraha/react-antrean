import React from "react";
import { Container, Nav, Navbar, Button, Image } from "react-bootstrap";
// import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

function NavbarWidget({ handleLogout, role }) {
  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image src="/logo.svg" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ms-auto">
            {role === "user" && (
              <>
                <Nav.Link as={Link} to="/home-user">
                  <span
                    style={{
                      fontWeight: "500",
                      fontSize: "16px",
                      transition: "all 0.3s ease",
                      color: "#000000",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#5356FF";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#000000";
                    }}
                  >
                    Halaman Utama
                  </span>
                </Nav.Link>
                <Nav.Link as={Link} to="/registrasi">
                  <span
                    style={{
                      fontWeight: "500",
                      fontSize: "16px",
                      transition: "all 0.3s ease",
                      color: "#000000",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#5356FF";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#000000";
                    }}
                  >
                    Registrasi
                  </span>
                </Nav.Link>
                <Nav.Link as={Link} to="/history">
                  <span
                    style={{
                      fontWeight: "500",
                      fontSize: "16px",
                      transition: "all 0.3s ease",
                      color: "#000000",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#5356FF";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#000000";
                    }}
                  >
                    Riwayat
                  </span>
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
            <Button
              variant="primary"
              className="ms-4"
              style={{ fontWeight: "500" }}
              onClick={handleLogoutClick}
            >
              Keluar
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarWidget;
