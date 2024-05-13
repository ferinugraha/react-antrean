import React from "react";
import { Container, Nav, Navbar, Button, Image } from "react-bootstrap";
// import { Button } from "../components/ui/button";
import { Link, useLocation } from "react-router-dom";
import "../../app/globals.css";

function NavbarWidget({ handleLogout, role }) {
  const location = useLocation();
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
                <Nav.Link
                  as={Link}
                  to="/home-user"
                  style={{
                    color:
                      location.pathname === "/home-user"
                        ? "#5356FF"
                        : "#000000",
                    fontWeight: "500",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                  }}
                  className="nav-link"
                >
                  Halaman Utama
                </Nav.Link>
                {/* <Nav.Link
                  as={Link}
                  to="/registrasi"
                  style={{
                    color:
                      location.pathname === "/registrasi"
                        ? "#5356FF"
                        : "#000000",
                    fontWeight: "500",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                  }}
                  className="nav-link"
                >
                  Registrasi
                </Nav.Link> */}
                <Nav.Link
                  as={Link}
                  to="/history"
                  style={{
                    color:
                      location.pathname === "/history" ? "#5356FF" : "#000000",
                    fontWeight: "500",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                  }}
                  className="nav-link"
                >
                  Riwayat
                </Nav.Link>
              </>
            )}

            {role === "admin" && (
              <>
                <Nav.Link
                  as={Link}
                  to="/home-admin"
                  style={{
                    color:
                      location.pathname === "/home-admin"
                        ? "#5356FF"
                        : "#000000",
                    fontWeight: "500",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                  }}
                  className="nav-link"
                >
                  Halaman Utama
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/report"
                  style={{
                    color:
                      location.pathname === "/report" ? "#5356FF" : "#000000",
                    fontWeight: "500",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                  }}
                  className="nav-link"
                >
                  Laporan
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/akun"
                  style={{
                    color:
                      location.pathname === "/akun" ? "#5356FF" : "#000000",
                    fontWeight: "500",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                  }}
                  className="nav-link"
                >
                  Akun
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/kuota"
                  style={{
                    color:
                      location.pathname === "/kuota" ? "#5356FF" : "#000000",
                    fontWeight: "500",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                  }}
                  className="nav-link"
                >
                  Kuota
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
