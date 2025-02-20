import React from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AdminLoginPage from '../../pages/admin/AdminLoginPage';
import Header from '../shared/Header';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../app/features/user/userSlice';
import { axiosInstance } from '../../config/axiosInstance';
import DarkMode from '../shared/DarkMode';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

function AdminHeader() {
  const navigate = useNavigate()
  const userInfo = useSelector((state) => (state.user))
  const dispatch = useDispatch()

  const handlLogOut = async () => {
      try {
        const response = await axiosInstance({
                method: "GET",
                url: "/admin/logout",
        });
        
        // console.log("logout=====",response?.data?.message)
  
        localStorage.removeItem("token");
        Cookies.remove('token');
        dispatch(clearUser());

        toast.success("You have loged out successfully");
        navigate("admin/login");
  
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message);
      }
    }
  
  return (
    <>
      {userInfo.isUserAuth ? (
        <>
          <Container>
            <Navbar bg="light" expand="lg" className="shadow-sm " fixed="top">
              <Container>
                <div>
                  <Navbar.Brand href="" className="fw-bold text-success">
                    TurfArena
                  </Navbar.Brand>
                </div>
                <div>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto my-2 my-lg-0">
                      <div className="d-flex justify-content-end">
                        <div className="mt-2">
                          <Link
                            to="/admin/home"
                            className="text-dark my-2 mx-2"
                            style={{ textDecoration: "none" }}
                          >
                            Home
                          </Link>
                          <Link
                            to="/admin/turfs"
                            className="text-dark my-2 mx-2"
                            style={{ textDecoration: "none" }}
                          >
                            Turf Details
                          </Link>
                          <Link
                            to="/admin/managers"
                            className="text-dark my-2 mx-2"
                            style={{ textDecoration: "none" }}
                          >
                            Manager Details
                          </Link>
                          <Link
                            to="/admin/bookings"
                            className="text-dark my-2 mx-2"
                            style={{ textDecoration: "none" }}
                          >
                            Bookings
                          </Link>
                          <Link
                            to="/admin/enquiries"
                            className="text-dark my-2 mx-2"
                            style={{ textDecoration: "none" }}
                          >
                            Enquiries
                          </Link>
                          <Link
                            to="/admin/profile"
                            className="text-dark my-2 mx-2"
                            style={{ textDecoration: "none" }}
                          >
                            Profile
                          </Link>
                        </div>
                      </div>
                    </Nav>
                  </Navbar.Collapse>
                </div>
                <div>
                  <div className="d-flex">
                    <Button
                      variant="success"
                      className="ms-3"
                      onClick={
                        handlLogOut
                      }
                    >
                      Log Out
                    </Button>
                    <DarkMode />
                  </div>
                </div>
              </Container>
            </Navbar>
          </Container>
        </>
      ) : (
        <>
          <Header />
        </>
      )}
    </>
  );
}

export default AdminHeader