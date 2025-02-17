import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { data, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

function NewManager() {
    const formData = new FormData();
    const [managerData, setManagerData] = useState({
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: "",
        dob: "",
      role:"manager",
      profilePic:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
      setManagerData({ ...managerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (managerData.password !== managerData.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      // console.log("User Data:", managerData);

      setError("");
      registerNewUser(managerData);
    };

    const registerNewUser = async (managerData) => {
        try {
          formData.append("fname", managerData.fname);
          formData.append("lname", managerData.lname);
          formData.append("mobile", managerData.mobile);
          formData.append("email", managerData.email);
          formData.append("password", managerData.password);
          formData.append("dob", managerData.dob);
            formData.append("profilePic", managerData.profilePic);
            formData.append("role",managerData.role)
            // console.log([...formData.entries()]);
            
            const response = await axiosInstance({
              method: "POST",
              url: "/admin/signin",
              data: formData,
            });

            // console.log("User data uploaded successfully:", response.data.data);
            toast.success("New Manager Account Created Successfully")
            handleReset()
            navigate("/admin/home");

        } catch (error) {
          console.error("Error uploading user data:", error);
          setError(error.response.data.message);
        }
    };

    const handleReset = () => {
        setManagerData({
          fname: "",
          lname: "",
          email: "",
          password: "",
          confirmPassword: "",
          mobile: "",
          dob: "",
          role: "manager",
          profilePic:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        });
    }
  return (
    <>
      <Container className="mt-3 d-flex justify-content-center align-items-center">
        <Card className="p-4 shadow-lg" style={{ width: "1000px" }}>
          <h3 className="text-center mb-3">New Manager</h3>
          {error && <p className="text-danger text-center">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Row className="gap-5">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    placeholder="Enter your first name"
                    value={managerData?.fname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    placeholder="Enter your last name"
                    value={managerData?.lname}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    value={managerData?.mobile}
                    onChange={handleChange}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={managerData?.dob}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={managerData?.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={managerData?.password}
                    onChange={handleChange}
                    minLength={5}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={managerData?.confirmPassword}
                    onChange={handleChange}
                    minLength={5}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-center gap-3">
              <Button variant="success" type="submit">
                Add Manager
              </Button>
              <Button
                variant="success"
                onClick={handleReset}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </>
  );
}

export default NewManager