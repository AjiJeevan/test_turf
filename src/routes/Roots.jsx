import React from 'react'
import Footer from '../components/shared/Footer'
import "../styles/homepage.css"
import { Outlet } from 'react-router-dom'
import Header from '../components/shared/Header';

function Roots() {
  return (
    <>
      <header>
        <Header />
      </header>
      <Outlet />
      <footer className="footer-section">
        <Footer />
      </footer>
    </>
  );
}

export default Roots