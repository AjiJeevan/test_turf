import React from 'react'
import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";

function Header() {
  return (
    <>
      <Container>
        <Navbar bg="light" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand href="./" className="fw-bold text-success">
              Turf Booking
            </Navbar.Brand>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="success">Search</Button>
            </Form>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="./" className="text-dark">
                  Home
                </Nav.Link>
                <Nav.Link href="#about" className="text-dark">
                  About
                </Nav.Link>
                <Nav.Link href="#contact" className="text-dark">
                  Contact
                </Nav.Link>
                <Button variant="success" className="ms-3">
                  Login/Signin
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </>
  );
}

export default Header