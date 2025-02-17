import React from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setSearchValue } from "../../app/features/search/searchSlice";
import { setSearchResult } from "../../app/features/search/searchResult";
import {clearUser} from "../../app/features/user/userSlice"
import { axiosInstance } from '../../config/axiosInstance';
import DarkMode from '../shared/DarkMode';
import toast from 'react-hot-toast';

function UserHeader() {
    const searchName = useSelector((state) => state.search.value);
    const dispatch = useDispatch();
    const turfList = useSelector((state) => state.turf.value);
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
      try {
        console.log(event.target.value);
        dispatch(setSearchValue(event.target.value));
      } catch (error) {
        console.log(`ERROR in handleSearchChange ==== ${error}`);
      }
    };

    const searchList = () => {
      try {
        console.log(searchName);
        if (!searchName) {
          alert("Please Provide a value to search");
          return;
        }

        const filteredTurfs = turfList.filter((turf) =>
        turf.name.toLowerCase().includes(searchName)
        );
        
        console.log(filteredTurfs);
        dispatch(setSearchResult(filteredTurfs));
        dispatch(setSearchValue(""));

        navigate("/user/user-search");

      } catch (error) {
        console.log(`ERROR in searchList ==== ${error}`);
      }
  };
  
  const handlLogOut = async () => {
    try {
      const response = await axiosInstance({
              method: "GET",
              url: "/user/logout",
      });
      
      console.log("logout=====",response?.data?.message)

      localStorage.removeItem("token");
      dispatch(clearUser());
      
      toast.success("You have loged out successfully")
      navigate("./");

    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
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
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto my-2 my-lg-0">
                <Link
                  to="/user/turf"
                  className="text-dark my-2 mx-2"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
                <Link
                  to="/user/booking"
                  className="text-dark my-2 mx-2"
                  style={{ textDecoration: "none" }}
                >
                  Booking Details
                </Link>
                <Link
                  to="/user/profile"
                  className="text-dark my-2 mx-2"
                  style={{ textDecoration: "none" }}
                >
                  Profile
                </Link>
                <Button
                  variant="success"
                  className="ms-3"
                  onClick={handlLogOut}
                >
                  Log Out
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
                <DarkMode />
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </>
  );
}

export default UserHeader