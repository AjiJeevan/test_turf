import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import Header from "../shared/Header";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import DarkMode from "../shared/DarkMode";
import { clearUser } from "../../app/features/user/userSlice";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

function ManagerHeader() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handlLogOut = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/manager/logout",
      });

      // console.log("logout=====", response?.data?.message);

      localStorage.removeItem("token");
      Cookies.remove('token');
        dispatch(clearUser());
        toast.success("You have loged out successfully");
      navigate("manager/login");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      {userInfo.isUserAuth ? (
        <>
          <Container>
            <Navbar bg="light" expand="lg" className="shadow-sm " fixed="top">
              <Container>
                <div>
                  <Navbar.Brand href="#" className="fw-bold text-success">
                    TurfArena
                  </Navbar.Brand>
                </div>

                <div>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto my-2 my-lg-0 justify-content-center">
                      <div className="d-flex justify-content-end">
                        <div className="mt-2">
                          <Link
                            to="/manager/home"
                            className="text-dark my-2 mx-2"
                            style={{ textDecoration: "none" }}
                          >
                            Home
                          </Link>
                          {/* <Link
                            to="/manager/home"
                            className="text-dark my-2 mx-2"
                            style={{ textDecoration: "none" }}
                          >
                            Assigned Turfs
                          </Link> */}
                          <Link
                            to="/manager/bookings"
                            className="text-dark my-2 mx-2"
                            style={{ textDecoration: "none" }}
                          >
                            Bookings
                          </Link>
                          <Link
                            to="/manager/profile"
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

                <div className="d-flex">
                  <Button
                    variant="success"
                    className="ms-3"
                    onClick={handlLogOut}
                  >
                    Log Out
                  </Button>
                  <DarkMode />
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

export default ManagerHeader;
