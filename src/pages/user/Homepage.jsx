import React from 'react'
import Header from '../../components/shared/header';
import { Button, Col, Container, Row } from 'react-bootstrap';
import "../../styles/homepage.css"
import Footer from '../../components/shared/Footer';
import Turf from '../../components/shared/Turf';

function Homepage() {
  return (
    <>
      <Container>
        <Header />
        <Container className="mt-2">
          <section className="main-section">
            <h1>Make Every Match Memorable</h1>
            <Button variant="success">BOOK NOW</Button>
          </section>
        </Container>
        <Container className="mt-2">
          <Row>
            <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
              <Turf />
            </Col>
            <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
              <Turf />
            </Col>
            <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
              <Turf />
            </Col>
            <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
              <Turf />
            </Col>
          </Row>
        </Container>
        <Footer />
      </Container>
    </>
  );
}

export default Homepage