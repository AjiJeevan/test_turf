import React, { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import "../../styles/contact.css";
import Button from "react-bootstrap/Button";
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

function Contacts() {
  const [email, setEmail] = useState("");
  const [enquiry, setEnquiry] = useState("")
  const [error,setError] = useState("")
  
  const handleEnquiry = async (e) => {
     e.preventDefault();
    try {
      if (email=="" || enquiry=="") {
        setError("Please provide all the fields")
        return
      }
      // console.log(email, enquiry)
      setError("")
      const response = await axiosInstance.post("enquiry/new-enquiry", { email, enquiry });
      // console.log(response.data.data)
      setEmail("")
      setEnquiry("")
      toast.success(response.data.message)

    } catch (error) {
      console.log(error)
      toast.error("Error in sending enquiry")
    }
  }
  return (
    <>
      <Container className="contact-section">
        <Row>
          <Col className="text-white justify-content-center m-5 ps-5 ">
            <h1>Let's get in touch</h1>
            <p>
              We're here to assist you! If you have any questions or need
              assistance, please feel free to reach out to us.
            </p>
            <p>Turf Booking, Near DIP Academy, Jebel Ali, Dubai, UAE </p>
            <p>+91 9212345457</p>
            <p>Mon to Fri 9 AM to 6 PM Connect with us:</p>
          </Col>
          <Col className="justify-content-center m-3 ps-5">
            <Form
              onSubmit={handleEnquiry}
              method="post"
              className="enquriry-message-section mt-5"
            >
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="message">
                <Form.Label className="text-white">
                  Enter your message
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="enquiry"
                  placeholder="Type here"
                  value={enquiry}
                  onChange={(e) => setEnquiry(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Send Enquiry
              </Button>
            </Form>
            {error && <p className="text-danger text-center">{error}</p>}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Contacts