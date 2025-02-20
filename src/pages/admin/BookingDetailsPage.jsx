import React, { useEffect, useState } from "react";
import {Button,Col,Container,Nav,Row,Spinner,Tab,Table,} from "react-bootstrap";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

function BookingDetailsPage() {
  const [bookingsPending, setBookingsPending] = useState([]);
  const [bookingsApproved, setBookingsApproved] = useState([]);
  const [bookingsRejected, setBookingsRejected] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/booking/all-booking-admin`,
      });
      // console.log(response?.data?.data);
      const pending = response?.data?.data?.filter(
        (booking) => booking.requestStatus === "pending"
      );
      const approved = response?.data?.data?.filter(
        (booking) => booking.requestStatus === "approved"
      );
      const rejected = response?.data?.data?.filter(
        (booking) => booking.requestStatus === "rejected"
      );

      setBookingsPending(pending);
      setBookingsApproved(approved);
      setBookingsRejected(rejected);

      // console.log(bookingsPending);
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching booking details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Spinner animation="border" />
        </>
      ) : (
        <>
          <Container className="mt-3">
            <h1 className="text-center">Booking Details</h1>
            <Tab.Container defaultActiveKey="pending">
              <Row>
                <Col>
                  <Nav variant="tabs" className="mb-3">
                    <Nav.Item>
                      <Nav.Link eventKey="pending">Pending</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="approved">Approved</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="rejected">Rejected</Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content>
                    <Tab.Pane eventKey="pending">
                      {bookingsPending?.length > 0 ? (
                        <>
                          <h3 className="text-center">Pending Bookings</h3>
                          <Table
                            responsive
                            striped
                            bordered
                            hover
                            className="text-center"
                          >
                            <thead>
                              <tr>
                                <th>Turf</th>
                                  <th>User</th>
                                <th>Date</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bookingsPending?.map((booking) => (
                                <tr key={booking?._id}>
                                  <td>{booking?.turfId?.name}</td>
                                  <td>{booking?.userId?.fname}</td>
                                  <td>
                                    {new Date(
                                      booking?.date
                                    ).toLocaleDateString()}
                                  </td>
                                  <td>{booking?.totalPrice}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </>
                      ) : (
                        <>
                          <p className="text-center text-danger ">
                            No pending bookings
                          </p>
                        </>
                      )}
                    </Tab.Pane>

                    <Tab.Pane eventKey="approved">
                      {bookingsApproved?.length > 0 ? (
                        <>
                          <h3 className="text-center">Approved Bookings</h3>
                          <Table
                            responsive
                            striped
                            bordered
                            hover
                            className="text-center"
                          >
                            <thead>
                              <tr>
                                <th>Turf</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bookingsApproved.map((booking) => (
                                <tr key={booking?._id}>
                                  <td>{booking?.turfId?.name}</td>
                                  <td>{booking?.userId?.fname}</td>
                                  <td>
                                    {new Date(
                                      booking?.date
                                    ).toLocaleDateString()}
                                  </td>
                                  <td>{booking?.totalPrice}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </>
                      ) : (
                        <>
                          <p className="text-center text-danger ">
                            No Approved bookings
                          </p>
                        </>
                      )}
                    </Tab.Pane>

                    <Tab.Pane eventKey="rejected">
                      {bookingsRejected?.length > 0 ? (
                        <>
                          <h3 className="text-center">Rejected Bookings</h3>
                          <Table
                            responsive
                            striped
                            bordered
                            hover
                            className="text-center"
                          >
                            <thead>
                              <tr>
                                <th>Turf</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bookingsRejected.map((booking) => (
                                <tr key={booking?._id}>
                                  <td>{booking?.turfId?.name}</td>
                                  <td>{booking?.userId?.fname}</td>
                                  <td>
                                    {new Date(
                                      booking?.date
                                    ).toLocaleDateString()}
                                  </td>
                                  <td>{booking?.totalPrice}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </>
                      ) : (
                        <>
                          <p className="text-center text-danger ">
                            No Rejected bookings
                          </p>
                        </>
                      )}
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
        </>
      )}
    </>
  );
}

export default BookingDetailsPage;
