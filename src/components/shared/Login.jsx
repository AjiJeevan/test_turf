import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Card } from "react-bootstrap";
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from "../../app/features/user/userSlice"
import toast from 'react-hot-toast';



function Login() {

  const navigate = useNavigate()
  let userInfo= useSelector((state)=>(state.user))
  const dispatch = useDispatch()


  const [error, setError] = useState("");
  const user = {
    role: "user",
    loginAPI: "/user/login",
    profileRoute: "/user/turf",
  }
  
    const [loginData, setLoginData] = useState({
      email: "",
      password: ""
    });
  

    const changeHandler = (event) => {
      let temData = { ...loginData };
      temData[event.target.name] = event.target.value;
      setLoginData(temData);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance({
              method: "PUT",
              url: user.loginAPI,
              data: loginData,
            });
          console.log(" user data==== ",response.data.data)
  
          dispatch(setUser(response?.data?.data))
          
          toast.success("Login Successfull")
          navigate(user.profileRoute)
            
        } catch (error) {
          console.log(error)
          toast.error(error?.response?.data?.message)
        }
    }
    
    return (
      <Container>
        <Card className="p-3 shadow-lg" style={{ width: "350px" }}>
          <h3 className="text-center mb-3">Login</h3>
          {error && <p className="text-danger text-center">{error}</p>}
          <Form onSubmit={handleSubmit} method="post">
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={loginData.email}
                onChange={changeHandler}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={changeHandler}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card>
      </Container>
    );
}

export default Login