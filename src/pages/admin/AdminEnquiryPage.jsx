import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Badge, Button, ButtonGroup, Container, Form, Modal, Table } from "react-bootstrap";
import { BsEye, BsPencilSquare, BsTrash } from "react-icons/bs";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

function AdminEnquiryPage() {
  const [refreshState, setRefreshState] = useState(false);
  const [enquiryList, isLoading, error] = useFetch("/enquiry/all-enquiry", refreshState);
  const [show, setShow] = useState(false);
  const [reply, setReply] = useState({
    id: "",
    email: "",
    enquiry: "",
    message: "",
  });

  const updateReply = (key, value) => {
    setReply(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // console.log("Enquiries ====== ", enquiryList);

  const handleDelete = async(id) =>{
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url :`/enquiry/delete/${id}`
      })
      toast.success("Enquiry deleted successfully")
      setRefreshState((prev)=>!prev)
    } catch (error) {
      toast.error("Error in deleting Enquiries.....")
    }
  }

  const handleReply = async (id) => {
    try {

      const selectedEnquiry = enquiryList.find((enquiry) => enquiry._id.toString() === id);
      // console.log("Selected Enquiry:", selectedEnquiry);

      if (!selectedEnquiry) {
        toast.error("Enquiry not found");
        return;
      }

      setReply({
        id: selectedEnquiry._id,
        email: selectedEnquiry.email,
        enquiry: selectedEnquiry.enquiry,
        message: "",
      });

      handleShow();
    } catch (error) {
      toast.error("Error loading reply form...");
    }
  }

  const sendReply = async () => {
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: `/enquiry/update/${reply.id}`,
        data: { message: reply.message }
      });
      toast.success("Reply sent successfully");
      handleClose();
      setRefreshState((prev) => !prev);
    } catch (error) {
      toast.error("Error sending reply...");
    }
  };

  return (
    <div>
      <Container>
        {isLoading ? <p>Loading...</p> : error ? <p>{error}</p> : enquiryList ? (
          <div>
            <h1 className="text-center">Enquiries</h1>
            <Table striped bordered hover>
              <thead>
                <tr className="text-center fw-bold">
                  <td>#</td>
                  <td>Email Id</td>
                  <td>Enquiry</td>
                  <td>Status</td>
                  <td>Actions</td>
                </tr>
              </thead>

              <tbody>
                {enquiryList?.map((enquiry, index) => (
                  <tr key={enquiry?._id}>
                    <td>{index + 1}</td>
                    <td><b>{enquiry?.email}</b></td>
                    <td>{enquiry?.enquiry}</td>
                    <td>
                      {/* {console.log(enquiry?.status)} */}
                      {enquiry?.status === "pending" ? (
                        <Badge bg="warning" text="dark">Pending</Badge>
                      ) : (
                        <Badge bg="success" text="dark">Replied</Badge>
                      )}
                    </td>
                    <td className="d-inline-flex align-items-center gap-1">
                      <Button variant="success" onClick={() => handleReply(enquiry?._id)}>
                        <BsPencilSquare />
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(enquiry?._id)}>
                        <BsTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Modal for Reply */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Send Reply</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" value={reply.email} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Enquiry:</Form.Label>
                    <Form.Control as="textarea" value={reply.enquiry} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Message:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={reply.message}
                      onChange={(e) => updateReply("message", e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={sendReply}>Send Reply</Button>
              </Modal.Footer>
            </Modal>
          </div>
        ) : <p>No Enquiries Found</p>}
      </Container>
    </div>
  );
}

export default AdminEnquiryPage;
