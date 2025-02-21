import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { AiFillStar } from 'react-icons/ai';

function Turf(props) {

  const navigate = useNavigate()
  const userInfo = useSelector((state) => (state.user))

  const handleViewDetails = async () => {
    try {
      if ( userInfo.isUserAuth && userInfo.role == "user"){
        navigate(`turf-details/${props.turfInfo._id}`);
      }
      else if (userInfo.isUserAuth && userInfo.role == "manager") {
        navigate(`turf-details/${props.turfInfo._id}`);
      }
      else {
        alert("Please login to seethe details")
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <Container>
      
      <Card
        className="p-2 mt-0 my-3"
        id={props?.turfInfo._id}
        style={{ height: "400px" }}
      >
        <Card.Img
          variant="top"
          src={props?.turfInfo.image}
          style={{ height: "200px", objectFit: "contain" }}
          className="mt-0 p-0"
        />
        <Card.Body className="align-items-center ">
          <Card.Title className="text-center">
            {props?.turfInfo?.name}
          </Card.Title>
          <Card.Text className="text-center">
            <b>AED {props?.turfInfo?.price} / Hour</b>
          </Card.Text>
          <Card.Text className="text-center">
          {props?.turfInfo.rating && props?.turfInfo.rating > 0 ? (
              [...Array(Math.round(props?.turfInfo.rating))].map((_, index) => (
                <AiFillStar key={index} color="gold" size={24} />
              ))
            ) : (
              <p>No Rating</p>
            )}
          </Card.Text >
          {!userInfo.isUserAuth ? (
            <></>
          ) : (
            <Button variant="success" onClick={handleViewDetails}>
              VIEW DETAILS
            </Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Turf