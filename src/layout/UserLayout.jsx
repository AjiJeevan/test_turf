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
      <section style={{backgroundImage: 'url("https://www.freewebheaders.com/wp-content/gallery/grass/cache/green-striped-grass-soccer-football-field-background-header.jpg-nggid044704-ngg0dyn-1280x375x100-00f0w010c010r110f110r010t010.jpg")',backgroundSize: 'cover'}}>
        <footer>
          <Footer />
        </footer>
      </section>
    </div>
  )
}

export default UserLayout