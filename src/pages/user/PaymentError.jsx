import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { BsXCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function PaymentError() {
    const navigate = useNavigate()

  return (
    <Container className="text-center mt-5 pt-5">
      <BsXCircle size={80} color="red" />
      <h2 className="mt-3 text-danger">Payment Failed</h2>
      <p>Oops! Something went wrong with your payment. Please try again.</p>
      <div className="d-flex justify-content-center gap-3">
        <Button variant="danger" onClick={() => navigate("/checkout")}>
          Retry Payment
        </Button>
        <Button variant="secondary" onClick={() => navigate("/user/booking")}>
          Go to My Bookings
        </Button>
      </div>
    </Container>
  )
}

export default PaymentError