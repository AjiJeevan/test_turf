import React from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AdminLoginPage from '../../pages/admin/AdminLoginPage';

function AdminHeader() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

  return (
    <>
      {token ? (
        <>
          <Container>
            <Navbar bg="light" expand="lg" className="shadow-sm" fixed="top">
              <Container className="d-flex justify-content-between">
                <Navbar.Brand href="/admin/homepage" className="fw-bold text-success">
                  TurfArena
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto my-2 my-lg-0">
                    <Link
                      to="/admin/homepage"
                      className="text-dark my-2 mx-2"
                      style={{ textDecoration: "none" }}
                    >
                      Home
                    </Link>
                    <Link
                      to="/admin/homepage"
                      className="text-dark my-2 mx-2"
                      style={{ textDecoration: "none" }}
                    >
                      Turf Details
                    </Link>
                    <Link
                      to="/admin/homepage"
                      className="text-dark my-2 mx-2"
                      style={{ textDecoration: "none" }}
                    >
                      Manager Details
                    </Link>
                    <Button
                      variant="success"
                      className="ms-3"
                                          onClick={() => {
                          localStorage.removeItem("token")
                        navigate("/admin");
                      }}
                    >
                      Log Out
                    </Button>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Container>
        </>
      ) : (
        <>
          <Container>
            <Navbar bg="light" expand="lg" className="shadow-sm" fixed="top">
              <Container>
                <Navbar.Brand href="/admin" className="fw-bold text-success">
                  TurfArena
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto my-2 my-lg-0">
                    <Link
                      to="/admin"
                      className="text-dark my-2 mx-2"
                      style={{ textDecoration: "none" }}
                    >
                      Home
                    </Link>
                    <Link
                      to="/admin/about"
                      className="text-dark my-2 mx-2"
                      style={{ textDecoration: "none" }}
                    >
                      About
                    </Link>
                    <Link
                      to="./contact"
                      className="text-dark my-2 mx-2"
                      style={{ textDecoration: "none" }}
                    >
                      Contact
                    </Link>
                    <Button
                      variant="success"
                      className="ms-3"
                      onClick={() => {
                        navigate("/admin");
                      }}
                    >
                      Log in/Sign in
                    </Button>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Container>
        </>
      )}
    </>
  );
}

export default AdminHeader