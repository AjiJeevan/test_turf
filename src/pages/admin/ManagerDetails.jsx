import React, { useEffect, useState } from "react";
import {Button,Card,Col,Container,Form,Image,ListGroup,Row,} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subYears } from "date-fns";

function ManagerDetails() {
 const managerId = useParams().id;
    const [manager, setManager] = useState({});
    const [assignedTurf,setAssignedTurf] = useState({})
  // console.log("manager Info ====== ", manager);
  const [isEditing, setIsEdting] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const maxDate = subYears(new Date(), 18); 
  const minDate = subYears(new Date(), 80);
  // console.log("Role ===== ", role);

  const fetchData = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/manager/manager-details/${managerId}`,
      });
    //   console.log("Fetch Data Response ==== ", response?.data?.data);
        setManager(response?.data?.data?.manager);
        setAssignedTurf(response?.data?.data?.assignedTurf)
        setSelectedDate(manager.dob)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditProfile = () => {
      setIsEdting(true);
  };
  const handleInputChange = (e) => {
    setManager({ ...manager, [e.target.name]: e.target.value });
  };
       

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setManager({ ...manager, [dob]: selectedDate });
    
  };

  const handleSaveProfile = async () => {
    //   console.log("updated value === ",manager)

    try {
        const response = await axiosInstance({
            method: "PUT",
            url: `/manager/update-manager/${managerId}`,
            data: manager 
      });

    //   console.log("response ==== ", response?.data?.data);
      setIsEdting(false);
        toast.success("Manager details Updated Successfully");
        
    } catch (error) {
      console.log(error);
      toast.error("Error in updating Manager Details ")
    }
      
  };

    const handleCancel = () => {
      setSelectedDate()
    setIsEdting(false);
    fetchData();
  };

  return (
    <>
          <Container>
              {}
        <h1 className="text-center pt-2 mb-4">Profile : {manager.fname}</h1>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="p-4 gap-3">
              <div className="text-center">
                <Image
                  src={manager.profilePic}
                  thumbnail
                  width="200"
                  height="200"
                  className="mb-3"
                />
              </div>
              {isEditing ? (
                <>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fname"
                        value={manager.fname}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lname"
                        value={manager.lname}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={manager.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Phone</Form.Label>
                      <Form.Control
                        type="number"
                        name="mobile"
                        value={manager.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold me-2">Date of Birth</Form.Label>
                    <DatePicker
                    name="dob"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={62}
                    minDate={minDate}
                    maxDate={maxDate}
                    className="form-control"
                    placeholderText="Select DOB"                      />
                    </Form.Group>
                  </Form>
                  <div className="d-flex justify-content-between">
                    <Button variant="success" onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                    <Button variant="success" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                                  <>
                                      <Row>
                                          <Col md={4}>
                                          <strong>First Name:</strong>
                                          </Col>
                                          <Col md={4}>
                                          {manager?.fname}
                                          </Col>
                                      </Row>
                                      <Row>
                                          <Col md={4}>
                                          <strong>Last Name:</strong>
                                          </Col>
                                          <Col md={4}>
                                          {manager?.lname}
                                          </Col>
                                      </Row>
                                      <Row>
                                          <Col md={4}>
                                          <strong>Email:</strong>
                                          </Col>
                                          <Col md={4}>
                                          {manager?.email}
                                          </Col>
                                      </Row>
                                      <Row>
                                          <Col md={4}>
                                          <strong>Phone:</strong>
                                          </Col>
                                          <Col md={4}>
                                          {manager?.mobile}
                                          </Col>
                                      </Row>
                                      <Row>
                                          <Col md={4}>
                                          <strong>Date of Birth :</strong>
                                          </Col>
                                          <Col md={4}>
                                          {new Date(manager?.dob).toLocaleDateString()}
                                          </Col>
                                      </Row>
                                      <Row>
                                          <Col md={4}>
                                          <strong>Assigned Turf</strong>
                                          </Col>
                                          <Col md={6}>
                                          {assignedTurf?.length > 0 ? <>
                                              <ListGroup as="ol" numbered>
                                              {assignedTurf?.map((turf, index) => (
                                                  <>
                                                      <ListGroup.Item as="li" key={turf?._id}>{turf?.name}</ListGroup.Item>
                                                  </>
                                              ))}
                                            </ListGroup>
                                              
                                          </> :
                                              <>
                                                  <p className="text-danger">No Turf Assigned</p>
                                          </>}
                                          </Col>
                                      </Row>
                            
                  <div
                    className="d-flex justify-content-center"
                    onClick={handleEditProfile}
                  >
                    <Button variant="success">Edit Profile</Button>
                  </div>
                </>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ManagerDetails