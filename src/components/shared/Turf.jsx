import React from 'react'
import { Button, Card } from 'react-bootstrap';

function Turf() {
  return (
    <Card className='p-2 mt-0'>
      <Card.Img
        variant="top"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUFRv5EFuO528AAwKdQIA833sA98LrdYlZJA&s"
        className="mt-1 p-0"
      />
      <Card.Body>
        <Card.Title>Turf Name</Card.Title>
        <Card.Text>Turf Price</Card.Text>
        <Button variant="success">VIEW DETAILS</Button>
      </Card.Body>
    </Card>
  );
}

export default Turf