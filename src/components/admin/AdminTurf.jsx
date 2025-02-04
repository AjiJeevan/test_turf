import React from 'react'
import { Button, Card, Container } from 'react-bootstrap';

function AdminTurf() {
  return (
    <Container>
      <Card className="p-2 mt-0">
        <Card.Img
          variant="top"
          src=""
          style={{ height: "200px", objectFit: "contain" }}
          className="mt-0 p-0"
        />
        <Card.Body className="align-items-center ">
          <Card.Title>Turf Name</Card.Title>
          <Card.Text>Price</Card.Text>
          <div className="d-flex gap-2">
            <Button className="btn-sm" variant="success">
              View
            </Button>
            <Button className="btn-sm" variant="success">
              Edit
            </Button>
            <Button className="btn-sm" variant="success">
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminTurf