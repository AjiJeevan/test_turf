import React, { useEffect, useState } from "react";
import {Button,Card,Col,Container,Form,Image,Row,} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

function ManagerProfile() {
  const userInfo = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  console.log("User Info ====== ", user);
  const dispatch = useDispatch();
  const [isEditing, setIsEdting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const role = useSelector((state) => state.user.role);
  console.log("Role ===== ", role);

  const fetchData = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/manager/profile",
      });
      console.log("Fetch Data Response ==== ", response.data);
      setUser(response?.data?.data);
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
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleSaveProfile = async () => {
    const formData = new FormData();
    formData.append("fname", user.fname);
    formData.append("lname", user.lname);
    formData.append("email", user.email);
    formData.append("mobile", user.mobile);
    formData.append("dob", user.dob);
    if (selectedFile) {
      formData.append("profilePic", selectedFile);
    }

    console.log([...formData.entries()]);

    try {
      const response = await axiosInstance.post(
        "/manager/update-profile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("response ==== ", response?.data?.data);
      setIsEdting(false);
      dispatch(setUser(response?.data?.data));
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      // toast.error("Error in updating profile")
    }
  };

  const handleCancel = () => {
    setIsEdting(false);
    fetchData();
  };

  return (
    <>
      <Container>
        <h1 className="text-center pt-2 mb-4">Profile : {user.fname}</h1>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="p-4 gap-3">
              <div className="text-center">
                <Image
                  src={previewImage || user.profilePic}
                  thumbnail
                  width="200"
                  height="200"
                  className="mb-3"
                />
              </div>
              {isEditing ? (
                <>
                  <Form.Group>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Form.Group>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fname"
                        value={user.fname}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lname"
                        value={user.lname}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobile"
                        value={user.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dob"
                        value={user.dob}
                        onChange={handleInputChange}
                        placeholder="Enter your date of birth"
                      />
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
                  <h4>
                    {user?.fname} {user?.lname}
                  </h4>
                  <p>
                    <strong>Email:</strong> {user?.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user?.mobile}
                  </p>
                  <p>
                    <strong>Date of Birth :</strong> {user?.dob}
                  </p>
                  <p>
                    <strong>Role :</strong> {userInfo?.role}
                  </p>
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
  );
}

export default ManagerProfile;
