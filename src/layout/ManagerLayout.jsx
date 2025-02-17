import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/shared/Footer'
import ManagerHeader from '../components/manager/ManagerHeader'
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../config/axiosInstance';
import { clearUser, setUser } from '../app/features/user/userSlice';

function ManagerLayout() {
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const checkUser = async () => {
    // console.log("Location=======", location);
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/manager/check-user",
      });
      dispatch(setUser());
      // console.log("isUserAuth from Manager Layout====", userInfo.isUserAuth);
    } catch (error) {
      dispatch(clearUser());
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, [location.pathname]);
    return (
      <>
    <header>
        <ManagerHeader />
      </header>
      <section className="mt-3 pt-5 min-vh-100">
        <Outlet />
      </section>
      <footer className="footer-section mt-3">
        <Footer />
      </footer>
    </>
  )
}

export default ManagerLayout