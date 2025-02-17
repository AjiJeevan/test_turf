import React, { useEffect } from 'react'
import Header from '../components/shared/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import { useDispatch, useSelector } from 'react-redux';
import UserHeader from "../components/user/UserHeader"
import { axiosInstance } from '../config/axiosInstance';
import { clearUser, setUser } from '../app/features/user/userSlice';

function UserLayout() {
  const userInfo = useSelector((state) => (state.user))
  
  //  console.log("isUserAuth from User Layout====", userInfo.isUserAuth);
   const dispatch = useDispatch();
   const location = useLocation();

  const checkUser = async () => {
    // console.log("Location=======",location)
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/check-user",
      });
      dispatch(setUser());
    } catch (error) {
      dispatch(clearUser());
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, [location.pathname]);
    
  return (
    <div>
      <section>
        <header>{!userInfo.isUserAuth ? <Header /> : <UserHeader />}</header>
      </section>
      <section className='min-vh-100'>
        <Outlet />
      </section>
      <section>
        <footer className="footer-section">
          <Footer />
        </footer>
      </section>
    </div>
  )
}

export default UserLayout