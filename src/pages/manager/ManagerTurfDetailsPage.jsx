import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

function ManagerTurfDetailsPage() {
  const [turfData, setTurfData] = useState();
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
      console.error("Error fetching turf details:", error);
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

export default ManagerTurfDetailsPage;
