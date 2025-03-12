import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import { Container, Table } from 'react-bootstrap';

function PaymentDetails() {
    const [payments, setPayments] = useState([]);

    const fetchPayment = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url : "/payment/all-payments"
            })
            console.log("Payment details ==== ", response?.data?.data)
            setPayments(response?.data?.data)
        } catch (error) {
            console.log(error)
        }    
    }

    useEffect(() => {
        fetchPayment()
    },[])

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Payment Details</h2>
      <Table striped bordered hover responsive>
        <thead className="bg-success text-white">
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Booking ID</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment, index) => (
              <tr key={payment?._id}>
                <td>{index + 1}</td>
                <td>{payment?.userId?.fname || "N/A"}</td>
                <td>{payment?.bookingId}</td>
                <td>₹{payment?.amount}</td>
                <td>{payment?.paymentMethod}</td>
                <td
                  className={
                    payment?.paymentStatus === "Completed" ? "text-success" : payment?.paymentStatus === "Pending" ? "text-warning": "text-danger"}
                >
                  {payment?.paymentStatus}
                </td>
                <td>{new Date(payment?.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No payment records found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  )
}

export default PaymentDetails