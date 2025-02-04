import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Login from '../../components/shared/Login';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate()

  return (
    <>
      <Container>
        <Row className="main-section">
          <Col className="text-center align-self-start">
            <h1 className="text-white">Make Every Match Memorable</h1>
            <Button
              variant="success"
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              SIGN UP NOW
            </Button>
          </Col>
          <Col>
            <div>
              <Login />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginPage