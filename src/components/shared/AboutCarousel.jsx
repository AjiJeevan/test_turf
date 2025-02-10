import React from 'react'
import { Carousel } from 'react-bootstrap';

function AboutCarousel() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSadtFGh6-srLNjc4nLoWJvZsUpxL91Jm-WcOZNrTXFyR0FLGIRg1Z7tYI0kxtPOH5cvA&usqp=CAU"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Easy Booking Process</h3>
            <p>
              Find, select, and book your preferred turf in just a few clicks.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
              <Carousel.Item>
                  <img
            className="d-block w-100"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSadtFGh6-srLNjc4nLoWJvZsUpxL91Jm-WcOZNrTXFyR0FLGIRg1Z7tYI0kxtPOH5cvA&usqp=CAU"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Wide Selection of Turfs</h3>
            <p>
              Choose from various locations, sports categories, and price
              ranges.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default AboutCarousel