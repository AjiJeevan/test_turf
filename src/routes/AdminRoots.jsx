import React from 'react'
import Footer from '../components/shared/Footer';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';

function AdminRoots() {
    return (
      <>
        <header>
          <AdminHeader />
        </header>
        <section className="mt-3 pt-5">
          <Outlet />
        </section>
        <footer className="footer-section mt-3">
          <Footer />
        </footer>
      </>
    );
}

export default AdminRoots