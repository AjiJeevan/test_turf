import React from 'react'
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <Container>
      <footer className=".bg-success text-white text-center py-4">
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
      </footer>
    </Container>
  );
}

export default Footer