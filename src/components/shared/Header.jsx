import React, { useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../app/features/search/searchSlice';
import { setSearchResult } from '../../app/features/search/searchResult';
import { useNavigate } from 'react-router-dom';

function Header() {

  const searchName = useSelector((state) => state.search.value);
  const dispatch = useDispatch();
  
  const turfList = useSelector((state) => state.turf.value);

  const navigate = useNavigate()

  const handleSearchChange = (event) => {
    try {
        dispatch(setSearchValue(event.target.value));
    } catch (error) {
      console.log(`ERROR in handleSearchChange ==== ${error}`)
    }
    
  }

  const searchList = () => {
    try {
      console.log(searchName);
      if (!searchName) {
        alert("Please Provide a value to search")
        return
      }
      const filteredTurfs = turfList.filter((turf) =>
        turf.name.toLowerCase().includes(searchName)
      );
      console.log(filteredTurfs);
      dispatch(setSearchResult(filteredTurfs));
      dispatch(setSearchValue(""));

      navigate("/search");

    } catch (error) {
      console.log(`ERROR in searchList ==== ${error}`);
    }
  }

  return (
    <>
      <Container>
        <Navbar bg="light" expand="lg" className="shadow-sm" fixed="top">
          <Container>
            <Navbar.Brand href="./" className="fw-bold text-success">
              TurfArena
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto my-2 my-lg-0">
                <Link
                  to="./"
                  className="text-dark my-2 mx-2"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
                <Link
                  to="./about"
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
                <Button variant="success" className="ms-3" onClick={() => {
                  navigate("/login")
                }}>
                  Log in/Sign in
                </Button>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchName}
                  onChange={handleSearchChange}
                />
                <Button variant="success" onClick={searchList}>
                  Search
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </>
  );
}

export default Header