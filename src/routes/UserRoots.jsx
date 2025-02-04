import React from "react";
import "../styles/homepage.css";
import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import UserHeader from "../components/user/userHeader";

function UserRoots() {
  return (
    <>
      <header>
        <UserHeader />
      </header>
      <section className="mt-3 pt-5">
        <Outlet />
      </section>
      <footer className="footer-section">
        <Footer />
      </footer>
    </>
  );
}

export default UserRoots;
