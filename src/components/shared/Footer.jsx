import React from 'react'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Footer() {
  const isUserAuth = useSelector((state) => (state.user.isUserAuth))
  const navigate = useNavigate()
  return (
    <Container>
      <footer className="text-white text-center py-4">
        <div className="container">
          <p className="mb-1">&copy; 2025 Turf Booking. All rights reserved.</p>
          <p className="mb-0">
            Follow us on:
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white ms-2"
            >
              Facebook
            </a>
            |
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white ms-2"
            >
              Twitter
            </a>
            |
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white ms-2"
            >
              Instagram
            </a>
          </p>
        </div>
        {!isUserAuth ? (
          <Link className="text-white" to="/admin-login"
            onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setTimeout(() => {
              navigate("admin/login");
            }, 500); 
            }}
          >
            Admin/Manager Login
          </Link>
        ) : (
          <></>
        )}
      </footer>
    </Container>
  )
}

export default Footer