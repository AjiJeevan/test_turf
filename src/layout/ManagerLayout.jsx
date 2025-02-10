import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/shared/Footer'
import ManagerHeader from '../components/manager/ManagerHeader'

function ManagerLayout() {
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