import React from 'react'
import { Container, ListGroup } from 'react-bootstrap';
import "../../styles/about.css"
import AboutCarousel from './AboutCarousel';

function About() {
  return (
    <>
      <Container className="section-about mt-5">
        <div>
          <h1 className="text-center">About Us </h1>
          <p>
            Welcome to <b>TurfArena</b>, your ultimate destination for
            hassle-free turf booking! Whether you're a sports enthusiast, an
            amateur team, or a professional club, we provide a seamless platform
            to book and manage sports turfs at your convenience.
          </p>
          <h2 className="text-center">Make Every Match Memorable</h2>
          <p>
            At <b>TurfArena</b>, we believe that every game deserves the perfect
            setting. Our platform ensures that you find the best sports turfs
            with ease, allowing you to focus on what truly matters—playing and
            enjoying the game.
          </p>
          <h2 className="text-center">Our Mission</h2>
          <p>
            Our Mission We aim to simplify the process of finding and reserving
            sports turfs, ensuring that players and teams get easy access to
            high-quality playing fields. Our platform connects users with
            multiple turf locations, offering real-time availability, secure
            payments, and a smooth booking experience.
          </p>
          <h2 className="text-center">Why Choose Us?</h2>
          {/* <AboutCarousel /> */}
          <ListGroup as="ul" variant='flush'>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold"> Easy Booking Process </div>
                Find, select, and book your preferred turf in just a few clicks.
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Wide Selection of Turfs</div>
                Choose from various locations, sports categories, and price ranges.
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Secure Payments</div>
                Make hassle-free and safe transactions with our integrated payment gateway.
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Personalized Recommendations</div>
                Get suggestions based on your past bookings and preferences.
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start" >
              <div className="ms-2 me-auto">
                <div className="fw-bold">24/7 Availability</div>
                Check turf schedules and book anytime, anywhere.
              </div>
            </ListGroup.Item>
          </ListGroup>
          <h2 className="text-center">Our Commitment </h2>
          <p>
            We strive to provide a top-notch experience for sports lovers by
            constantly improving our services, adding new locations, and
            ensuring customer satisfaction. Whether it's for casual play,
            tournaments, or corporate sports events, we’ve got the perfect turf
            for you!
          </p>
          <h3 className="text-center">Book Play Enjoy </h3>
          <h3 className="text-center">
            Start your booking today and <b>Make Every Match Memorable</b> with{" "}
            <b>TurfArena</b>!
          </h3>
        </div>
      </Container>
    </>
  );
}

export default About