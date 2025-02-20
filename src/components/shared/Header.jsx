import React, { useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../app/features/search/searchSlice';
import { setSearchResult } from '../../app/features/search/searchResult';
import { useNavigate } from 'react-router-dom';
import DarkMode from './DarkMode';
import toast from 'react-hot-toast';
import { setTurfLists } from '../../app/features/turf/turfSlice';

function Header() {

  const [activeTab, setActiveTab] = useState("home");
  const searchName = useSelector((state) => state.search.value);
  const dispatch = useDispatch();
  const turfList = useSelector((state) => state.turf.value);
  // const [turfList,setTurfList] = useState({})
  const navigate = useNavigate()


  const handleSearchChange = (event) => {
    try {
        dispatch(setSearchValue(event.target.value));
    } catch (error) {
      console.log(`ERROR in handleSearchChange ==== ${error}`)
    }
    
  }
  const fetchTurfs = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: "/turf/all-turf",
        });
        // console.log(response.data)
        dispatch(setTurfLists(response?.data?.data));
        // setTurfLists(response?.data?.data)
        
      } catch (error) {
        toast.error("Error in fetching turfs")
          console.log(error)
      }
  }
  
  useEffect(() => {
    fetchTurfs
  },[])

  

  const searchList = () => {
    try {
      // console.log(searchName);
      if (!searchName) {
        toast.error("Please Provide a value to search")
        return
      }
      const filteredTurfs = turfList?.filter((turf) =>
        turf.name.toLowerCase().includes(searchName)
      );
      // console.log(filteredTurfs);
      if (filteredTurfs.length == 0)
      {
        toast.error("No Turf Found")
        dispatch(setSearchValue(""));
        return
      }
      dispatch(setSearchResult(filteredTurfs));
      dispatch(setSearchValue(""));

      navigate("/search");
      // navigate("/home");

    } catch (error) {
      console.log(`ERROR in searchList ==== ${error}`);
    }
  }

  return (
    <>
      <Container>
        <Navbar bg="light" expand="lg" className="shadow-sm" fixed="top">
          <Container>
            <div>
                <Navbar.Brand href="/" className="fw-bold text-success">
                  TurfArena
                </Navbar.Brand>
            </div>
            <div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto my-2 my-lg-0">
                <Link
                  to="/"
                  className="text-dark my-2 mx-2"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-dark my-2 mx-2"
                  style={{ textDecoration: "none" }}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-dark my-2 mx-2"
                  style={{ textDecoration: "none" }}
                >
                  Contact
                </Link>
                <Button
                  variant="success"
                  className="ms-3"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Log in/Sign in
                </Button>
              </Nav>
              </Navbar.Collapse>
            </div>
            <div>
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
                <DarkMode />
              </Form>
            </div>
            
          </Container>
        </Navbar>
      </Container>
    </>
  );
}

export default Header