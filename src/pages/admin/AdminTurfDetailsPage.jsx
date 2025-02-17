import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

function AdminTurfDetailsPage() {
  const [turfData, setTurfData] = useState();
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const turfId = useParams().id;
  // console.log("TurfId  === ", turfId);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: { address: "", city: "" },
    price: "",
    image: "",
    slots: [],
  });

  const fetchTurfDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance({
        method: "GET",
        url: `turf/turf-details/${turfId}`,
      });
      setTurfData(response?.data?.data);
      // console.log("Turf Data === ", turfData);
    } catch (error) {
      // console.error("Error fetching turf details:", error);
      toast.error("Error fetching turf details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (turfId) {
      fetchTurfDetails();
    }
  }, [turfId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
   try {
     const response = await axiosInstance({
       method: "DELETE",
       url: `/turf/delete-turf/${turfId}`,
     });
     setShowModal(false)
     toast.success("Turf deleted successfully");
     navigate("/admin/home")
   } catch (error) {
     toast.error("Error in deleting turf");
   }
  }

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <Container>
        {loading ? (
          <>
            <>
              <Spinner animation="border" />
            </>
          </>
        ) : (
          <>
            <section className="shadow p-3 mb-5 bg-body rounded">
              {turfData ? (
                <>
                  <Container className="my-4 pt-5">
                    <Row>
                      <Col md={6}>
                        <div className="d-flex justify-content-center">
                          <Card style={{ width: "300px", height: "100%" }}>
                            <Card.Img
                              variant="top"
                              src={turfData?.image}
                              alt={turfData?.name}
                            />
                          </Card>
                        </div>
                      </Col>
                      <Col md={6}>
                        <h1>{turfData?.name}</h1>
                        <div>
                          <strong>Location:</strong>{" "}
                          {turfData?.location?.address},{" "}
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
                        <div>
                          <div>
                            <strong>Slot:</strong> <br></br>
                            {turfData?.availability?.length > 0 ? (
                              <>
                                {turfData?.availability?.map((slot, index) => (
                                  <Button
                                    key={index}
                                    variant={
                                      slot.isAvailable ? "success" : "danger"
                                    }
                                    className="m-2"
                                  >
                                    {slot.slots}
                                  </Button>
                                ))}
                              </>
                            ) : (
                              <p>Not Available</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <strong>Managed By : </strong>
                          {turfData?.managerId?.fname}{" "}
                          {turfData?.managerId?.lname}
                        </div>
                        <div className="mt-2">
                            <Button className="me-2" variant="success" onClick={() => {
                              navigate(`/admin/turf-edit/${turfData?._id}`);
                          }}>
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={handleShowModal}
                          >
                            Delete
                          </Button>
                          <Modal
                            show={showModal}
                            onHide={() => setShowModal(false)}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Confirm Delete</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are you sure you want to delete this turf?
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={() => setShowModal(false)}
                              >
                                Cancel
                              </Button>
                              <Button variant="danger" onClick={handleDelete}>
                                Yes, Delete
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </>
              ) : (
                <></>
              )}
            </section>
          </>
        )}
      </Container>
    </>
  );
}

export default AdminTurfDetailsPage;
