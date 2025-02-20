import React, { useEffect } from "react";
import Footer from "../components/shared/Footer";
import { Outlet, useLocation } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../app/features/user/userSlice";
import { axiosInstance } from "../config/axiosInstance";

function AdminLayout() {

  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const checkUser = async () => {
      // console.log("Location=======",location)
      try {
        const response = await axiosInstance({
          method: "GET",
          url: "/admin/check-user",
        });
        dispatch(setUser(response?.data?.data));
        // console.log("isUserAuth from Admin Layout====", userInfo.isUserAuth);
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
        <AdminHeader />
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

export default AdminLayout
