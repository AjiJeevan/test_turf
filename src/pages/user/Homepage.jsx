import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Pagination, Row } from 'react-bootstrap';
import "../../styles/homepage.css"
import Turf from '../../components/shared/Turf';
import About from "../../components/shared/About";
import Contacts from '../../components/shared/Contacts';
import { axiosInstance } from '../../config/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { setTurfLists } from '../../app/features/turf/turfSlice';
import MainBanner from '../../components/shared/MainBanner';
import { useNavigate } from 'react-router-dom';

function HomePage() {

  const token = localStorage.getItem("token")
  const turfList = useSelector((state) => state.turf.value);
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const fetchTurfs = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/turf/all-turf",
      });
      console.log(response.data)
      dispatch(setTurfLists(response?.data?.data.slice(0,4)));
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchTurfs()
  }, [])

  const handleLogin = async () => {
    try {
      navigate(`/login`);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <section id="home">
        <MainBanner />
      </section>
      <Container className="mt-5">
        <Row>
          {turfList?.map((turf, index) => {
            return (
              <Col key={turf?._id} xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
                <Turf turfInfo={turf} />
              </Col>
            );
          })}
        </Row>
      </Container>
        <div className="d-flex justify-content-center mt-3">
          <Button variant="success" onClick={handleLogin}>
            LogIn / SignUp to see the details
          </Button>
        </div>
      <Container className="overflow-auto" id="about">
        <About />
      </Container>
      <section id="contact">
        <Contacts />
      </section>
    </>
  );
}

export default HomePage