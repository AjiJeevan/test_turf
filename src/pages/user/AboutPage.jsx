import React from 'react'
import About from '../../components/shared/About';
import { Container } from 'react-bootstrap';

function AboutPage() {
  return (
    <Container className="about-section overflow-auto" id="about">
      <About />
    </Container>
  );
}

export default AboutPage