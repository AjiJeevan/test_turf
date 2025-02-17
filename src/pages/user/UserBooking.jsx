import React, { useEffect, useState } from "react";
import { Badge, Button, Container, Spinner, Tab, Table, Tabs } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

function UserBooking() {
  const [key, setKey] = useState("upcoming");
  const [loading, setLoading] = useState(false);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  
  const fetchBooking = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/booking/user-booking",
      });
      setUpcomingBookings(response?.data?.data?.upcoming);
      setPastBookings(response?.data?.data?.history);
      setLoading(false);

    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooking()
  }, [])
  
  const handleCancelBooking = async (bookingId,turfId) => {
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: "/booking/update-booking",
        data: {
          bookingId,
          turfId,
          status:"cancelled"
        }
      });
      fetchBooking()
      toast.success("Booking cancelld successfully")
    } catch (error) {
      toast.error("Error in Cancelling Booking")
    }
  }

  const handleMakePayment = async (bookingId) => {
    try {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

        const session = await axiosInstance({
            url: "/payment/create-checkout-session",
            method: "POST",
            data: { bookingId },
        });

        // console.log(session, "=======session");
        const result = stripe.redirectToCheckout({
          sessionId: session.data.sessionId,
          
          
        });
    } catch (error) {
      console.log(error);
      
    }
  };
  

  return (
    <>
      <Container className="mt-5 pt-5">
        <section className="shadow p-3 mb-5 bg-body rounded">
          <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
            <Tab eventKey="upcoming" title="Upcoming Bookings">
              {loading ? (
                <>
                  <Spinner animation="border" />
                </>
              ) : (
                <>
                  <Table striped bordered hover>
                    <thead className="text-center">
                      <tr>
                        <th>#</th>
                        <th>Turf</th>
                        <th>Date</th>
                        <th>Slot</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingBookings.length > 0 ? (
                        <>
                          {upcomingBookings?.map((booking, index) => {
                            return (
                              <tr key={booking?._id}>
                                <td>{index + 1}</td>
                                <td>{booking?.turfId?.name}</td>
                                <td>
                                  {new Date(booking?.date).toLocaleDateString()}
                                </td>
                                <td>{booking?.slots?.join(", ")}</td>
                                <td className="text-center">{booking?.requestStatus}</td>
                                <td className="text-center">
                                  {booking?.requestStatus === "pending" ? (
                                    <>
                                      <Button variant="danger" size="sm" onClick={() => { handleCancelBooking(booking._id,booking.turfId._id) }}>
                                        Cancel
                                      </Button>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {booking?.requestStatus === "approved" ? (
                                    <>
                                      {(booking?.paymentStatus === "not" || booking?.paymentStatus === "failed") ? <>
                                        <Button variant="success" size="sm" onClick={() => {
                                        handleMakePayment(booking?._id)
                                      }}>
                                        Pay Now
                                      </Button>
                                      </> : <>
                                      <Badge bg="success">Paid</Badge>
                                      </>}
                                      
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <tr>
                            <td colSpan="6" className="text-center">
                              No upcoming bookings.
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </Table>
                </>
              )}
            </Tab>
            <Tab eventKey="past" title="Cancelled & Completed">
              {loading ? (
                <>
                  <Spinner animation="border" />
                </>
              ) : (
                <>
                  <Table striped bordered hover>
                    <thead className="text-center">
                      <tr>
                        <th>#</th>
                        <th>Turf</th>
                        <th>Date</th>
                        <th>Slot</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastBookings.length > 0 ? (
                        pastBookings.map((booking, index) => (
                          <tr key={booking?._id}>
                            <td>{index + 1}</td>
                            <td>{booking?.turfId?.name}</td>
                            <td>
                              {new Date(booking?.date).toLocaleDateString()}
                            </td>
                            <td>{booking?.slots?.join(", ")}</td>
                            <td className="text-center">{booking?.status}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No past bookings.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </>
              )}
            </Tab>
          </Tabs>
        </section>
      </Container>
    </>
  );
}

export default UserBooking;
