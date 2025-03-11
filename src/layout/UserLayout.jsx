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
  const isLogedIn = useSelector((state)=>(state.logedin.value))
  
  //  console.log("isUserAuth from User Layout====", userInfo.isUserAuth);
   const dispatch = useDispatch();
   const location = useLocation();

  const checkUser = async () => {
    console.log("is user Auth ==== " , userInfo.isUserAuth)
    console.log("Location=======",location)
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/check-user",
      });
      dispatch(setUser(response?.data?.data));
    } catch (error) {
      dispatch(clearUser());
      console.log(error);
    }
  };

  useEffect(() => {
    // if (!userInfo.isUserAuth) {
    //   checkUser();
    // }
    checkUser();
  }, [location.pathname]);
    
  return (
    <div>
      <section>
      <header>{(userInfo.isUserAuth && isLogedIn) ? <UserHeader /> : <Header />}</header>
      </section>
      <section className='min-vh-100'>
        <Outlet />
      </section>
      <section>
        <footer className='bg-success'>
          <Footer />
        </footer>
      </section>
    </div>
  )
}

export default UserLayout