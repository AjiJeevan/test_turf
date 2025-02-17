import React, { useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../../app/features/user/userSlice";

function SignUpPage() {
  const formData = new FormData();
  const dispatch = useDispatch(); 
    const [userData, setUserData] = useState({
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: "",
      dob: "",
      profilePic:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    });

  const [error, setError] = useState("");
  const navigate = useNavigate()

    const handleChange = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (userData.password !== userData.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      // console.log("User Data:", userData);

        setError(""); 
      registerNewUser(userData)
       
    };

    const registerNewUser = async (userData) => {
      try {
          
            formData.append("fname", userData.fname);
            formData.append("lname", userData.lname);
            formData.append("mobile", userData.mobile);
            formData.append("email", userData.email);
            formData.append("password", userData.password);
            formData.append("dob", userData.dob);
            formData.append("profilePic", userData.profilePic);
            

            // console.log([...formData.entries()]);
        const response = await axiosInstance.post("/user/signup", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
            
        // console.log("User data uploaded successfully:", response.data.data);

        dispatch(setUser(response?.data?.data))
        navigate("/user/turf")

        } catch (error) {
        // console.error('Error uploading user data:', error);
        setError(error.response.data.message);
        dispatch(clearUser())
        navigate("/sign-up")
        }
    }

  return (
    <>
      <section
        style={{
          backgroundImage:
            "https://t3.ftcdn.net/jpg/07/22/89/60/360_F_722896080_1BEPJOrcjw91HtLLGFe9W44ZgTkhKG2F.jpg",
        }}
      >
        <Container className="mt-5 pt-5 d-flex justify-content-center align-items-center">
          <Card className="p-4 shadow-lg" style={{ width: "1000px" }}>
            <h3 className="text-center mb-3">Sign Up</h3>
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
                      value={userData.fname}
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
                      value={userData.lname}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="mobile"
                      placeholder="Enter your mobile number"
                      value={userData.mobile}
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
                      value={userData.dob}
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
                      value={userData.email}
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
                      value={userData.password}
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
                      value={userData.confirmPassword}
                      onChange={handleChange}
                      minLength={5}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-center">
                <Button variant="success" type="submit" className="w-50">
                  Sign Up
                </Button>
              </div>
            </Form>

            <div className="text-center mt-3">
              <small>
                Already have an account? <Link to="/login">Sign In</Link>
              </small>
            </div>
          </Card>
        </Container>
      </section>
    </>
  );
}

export default SignUpPage
