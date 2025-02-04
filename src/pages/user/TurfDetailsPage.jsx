import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { axiosInstance } from '../../config/axiosInstance';
import { useParams } from 'react-router-dom';

function TurfDetailsPage() {
  const [turfData, setTurfData] = useState();
  const turfId= useParams().id
  
  const fetchData = async () => {
    try {
      const response = await axiosInstance({
           method: "GET",
           url: `turf/turf-details/${turfId}`,
      })
      setTurfData(response.data.data)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  useEffect(() => {
      fetchData()
  }, []);
  

    
  // const handleViewDetails = () => {
    
  // }

  return (
    <>
      <Container className="my-4">
        <Row>
          <Col md={6}>
            <Card>
              <Card.Img
                variant="top"
                src={turfData?.image}
                alt={turfData?.name}
              />
            </Card>
          </Col>
          <Col md={6}>
            <h1>{turfData?.name}</h1>
            <p>
              <strong>Location:</strong> {turfData?.location?.address},{" "}
              {turfData?.location?.city}
            </p>
            <p>
              <strong>Price:</strong> AED {turfData?.price} / hour
            </p>
            <p>
              <strong>Facilities :</strong>
              <ul>
                {turfData?.facilities?.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </p>
            <Button variant="success" size="lg" className="w-100 mt-3">
              Book Now
            </Button>
          </Col>
        </Row>
      </Container>
      {/* <Container>
        <section>
          <div className="d-flex justify-content-center">
            <h1>Turf Details</h1>
          </div>
        </section>
        <section>
          <Card className="p-2 mb-2" id={turfId} style={{ width: 500 }}>
            <Row>
              <Col>
                <Card.Img
                  variant="top"
                  src={turfData?.image}
                  style={{ height: "200px", objectFit: "contain" }}
                  className="mt-0 p-0"
                />
                <Card.Body className="align-items-center">
                  <Card.Title>{turfData?.name}</Card.Title>
                  <Card.Text>Price / Hour : {turfData?.price}</Card.Text>
                  <Card.Text>{turfData?.location?.address}</Card.Text>
                  <Card.Text>{turfData?.location?.city}</Card.Text>
                </Card.Body>
              </Col>
              <Col>
                <Card.Body className="align-items-center">
                  <Card.Title>facilities {turfData?.facilities}</Card.Title>
                </Card.Body>

              </Col>
            </Row>
            <div className="d-flex justify-content-center ">
              <Button variant="success" onClick={handleViewDetails}>
                BOOK NOW
              </Button>
            </div>
          </Card>
        </section>
      </Container> */}
    </>
  );
}

export default TurfDetailsPage