import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import toast from "react-hot-toast";

function TurfDetailsPage() {
  // console.log("checking.........")
  const [turfData, setTurfData] = useState();
  const navigate = useNavigate()
  const turfId = useParams().id;
  const userInfo = useSelector((state) => state.user);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState();
  const [loading, setLoading] = useState();
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    turfId: "",
    date : "",
    slot : "",
    totalPrice : ""
  });

  const fetchData = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `turf/turf-details/${turfId}`,
      });
      setTurfData(response?.data?.data);
      // console.log("Turf Details ==== ", turfData)
      // console.log(turfData.availability);
    } catch (error) {
      // console.log(error.response?.data?.message);
      toast.error(error?.response?.data?.message)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateChange = async (date) => {
    setSelectedDate(date)
  };
  
  const handleCheckAvailability = async () => {
    if (!selectedDate) {
      toast.error("Please select a date ")
      return
    }
    setLoading(true)
      try {
        const response = await axiosInstance({
          method: "POST",
          url: "/booking/available-slot",
          data: {
            turfId: turfId,
            date: selectedDate,
          },
        });
        setAvailableSlots(response?.data?.data)
        // console.log("avalable slot ===== ",availableSlots)
      } catch (error) {
        // console.log(error?.response?.data?.message)
        toast.error("No Slot Available")
    }
      finally {
        setLoading(false)
    }
  }

  const handleSlotClick = (slot) => {
    let updatedSlots;

    if (selectedSlots.includes(slot)) {
      updatedSlots = selectedSlots.filter((s) => s !== slot);
    } else {
      updatedSlots = [...selectedSlots, slot];
    }

    setSelectedSlots(updatedSlots);
  };

  const handleBookNow = async () => {
    if (!selectedDate) {
      toast.error("Please select a date and slot to book")
      return
    }
    if ( selectedSlots == 0) {
      toast.error("Please select a slot ")
      return
    }
    // console.log("selected slots === ", selectedSlots)
    const totalPrice = selectedSlots?.length * turfData.price;

    // console.log("total price === ", totalPrice)
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/booking/new-booking",
        data: {
          turfId : turfId,
          date: selectedDate,
          slot: selectedSlots,
          totalPrice : totalPrice
        }
      });

      // console.log("Booking details ====== ", response?.data?.data)
      toast.success("Booking successfully created!");
      handleCancelBooking()
      navigate("/user/booking");

    } catch (error) {
      // console.log(error)
      toast.error("Booking failed. Please try again.");
    }
    finally {
      setLoading(false);
    }
  }


  const handleCancelBooking = () => {
    setSelectedSlots([]);
    setSelectedDate("");
    navigate("/user/turf");
  }

  return (
    <>
      <Container className="my-4 pt-5">
        <Row>
          <Col md={6}>
            <Card>
              <Card.Img
                variant="top"
                src={turfData?.image}
                alt={turfData?.name}
              />
            </Card>
          </Col>
          <Col md={6}>
            <h1>{turfData?.name}</h1>
            <div>
              <strong>Location:</strong> {turfData?.location?.address},{" "}
              {turfData?.location?.city}
            </div>
            <div>
              <strong>Price:</strong> AED {turfData?.price} / hour
            </div>
            <div>
              <strong>Facilities :</strong>

              <div className="d-flex flex-wrap gap-3">
                {turfData?.facilities?.map((facility, index) => (
                  <Button key={index} variant="secondary">
                    {facility}{" "}
                  </Button>
                ))}
              </div>
            </div>
            <div className=" d-flex my-4">
              <label>
                <strong>Select Booking Date : </strong>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={addDays(new Date(), 1)} // Starts from tomorrow
                  maxDate={addDays(new Date(), 30)} // Allows selection up to one month ahead
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  shouldCloseOnSelect={true}
                />
              </label>
              <Button
                variant="success"
                className="ms-3"
                onClick={handleCheckAvailability}
              >
                Check Availability
              </Button>
            </div>
            <div>
              <strong>Select a Time Slot:</strong> <br></br>
              {loading ? (
                <>
                  <Spinner animation="border" />
                </>
              ) : availableSlots?.length === 0 ? (
                  <>
                    <div>
                      <p className="text-danger">No Slots Availablet</p>
                      </div>
                  
                </>
              ) : (
                <>
                  <div>
                    {availableSlots?.map((slot, index) => (
                      <Button
                        key={index}
                        variant={
                          selectedSlots.includes(slot)
                            ? "success"
                            : "outline-success"
                        }
                        className="m-2"
                        onClick={() => handleSlotClick(slot)}
                      >
                        {slot}
                      </Button>
                    ))}
                    <div className="d-flex gap-5">
                      <Button
                        variant="success"
                        size="lg"
                        className="w-50 mt-3"
                        onClick={handleBookNow}
                      >
                        Book Now
                      </Button>
                      <Button
                        variant="success"
                        size="lg"
                        className="w-50 mt-3"
                        onClick={handleCancelBooking}
                      >
                        Cancel Booking
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TurfDetailsPage;
