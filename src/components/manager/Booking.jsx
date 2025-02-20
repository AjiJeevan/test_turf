import React, { useState } from 'react'
import { Button, Card, Dropdown, ListGroup } from 'react-bootstrap';
import { axiosInstance } from '../../config/axiosInstance';

function Booking(props) {
    const [bookingLists, setBookingLists] = useState([])
    const [isLoading,setIsloading] = useState("false")
    

    const fetchBookingLists = async (id) => {
        try {
            const response = await axiosInstance({
            method: "GET",
            url: `/booking/booking-details/${id}`,
          });
            // console.log(`Booking details of turf ${id} ==== `, response?.data?.data)
            if (response?.data?.data.length == 0)
            {
                alert("No Booking Available")
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
      <Card>
        <Card.Img variant="top" src={props?.turfInfo?.image} />
        <Card.Body className="text-center">
          <Card.Title>{props?.turfInfo.name}</Card.Title>
          <Button
            onClick={() => {
              fetchBookingLists(props?.turfInfo?._id);
            }}
          >
            Booking
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default Booking