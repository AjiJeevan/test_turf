import React from 'react'
import { Button, Card, Container } from 'react-bootstrap';

function ManagerTurf(props) {
     const handleViewDetails = async () => {
         try {
           
       } catch (error) {}
     };
  return (
    <Container>
      <Card className="p-2 mt-0" style={{ height: "400px" }}>
        <Card.Img
          variant="top"
          src={props?.turfInfo?.image}
          style={{ height: "200px", objectFit: "contain" }}
          className="mt-0 p-0"
        />
        <Card.Body>
          <div className="align-items-center">
            <Card.Title>{props.turfInfo?.name}</Card.Title>
            <Card.Text>
              <b>AED {props.turfInfo?.price} / Hour</b>
            </Card.Text>
          </div>
          <div className="d-flex justify-content-start pt-2">
            <Button variant="success" onClick={handleViewDetails}>
              VIEW DETAILS
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ManagerTurf