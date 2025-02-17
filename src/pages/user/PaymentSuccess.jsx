import React, { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap';
import { BsCheckCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
    const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/user/booking");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);
    
  return (
    <Container className="text-center mt-5 pt-5">
      <BsCheckCircle size={80} color="green" />
      <h2 className="mt-3 text-success">Payment Successful!</h2>
      <p>Your booking has been confirmed. You will be redirected shortly.</p>
      <Button variant="primary" onClick={() => navigate("/user/booking")}>
        Go to My Bookings
      </Button>
    </Container>
  )
}

export default PaymentSuccess