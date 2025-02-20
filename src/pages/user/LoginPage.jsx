import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Login from '../../components/shared/Login';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate()

  return (
    <>
      <Container className='pt-5 mt-5' fluid="md" >
        <Row className="main-section">
          <Col xs={12} md={6} className="text-center align-self-start">
            <h1 className="text-white">Make Every Match Memorable</h1>
            <Button
              variant="success"
              className='mb-2'
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              SIGN UP NOW
            </Button>
          </Col>
          <Col xs={12} md={6} className="align-self-center justify-content-center mb-2">
            <div className="w-100 " style={{ maxWidth: "400px" }}>
            <Login />
          </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginPage