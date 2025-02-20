import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Col, Container, Form, Image, Row, ToggleButton} from 'react-bootstrap'
import { useFetch } from '../../hooks/useFetch';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function NewTurfPage() {
    const [turfData, setTurfData] = useState({
      name: "",
      location: {
        address: "",
        city: "",
      },
      image: "",
      price: "",
      facilities: [],
      sportsType: [],
      availability: [],
      managerId: "",
    });
    const facilitiesList = [
      "Changing Rooms",
      "Shower Facilities",
      "Restrooms",
      "First Aid Kit",
      "CCTV Security",
      "Parking Area",
      "Cafeteria"
    ]

    const sportsTypeList = [
      "Football (Soccer)",
      "Cricket",
      "Tennis",
      "Basketball",
      "Badminton"
  ]

    const availableHours = []
    for (let i = 4; i < 24; i++ )
    {
        availableHours.push(`${ (i<13) ? i : (i-12) }:00 ${i<12 ? 'AM' : 'PM'} - ${((i+1) < 13 ) ? i+1 : ((i+1)-12) } : 00 ${( i+1) < 12 ? 'AM' : 'PM'}`)
    }

    // console.log(availableHours)

    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [managers, setManagers] = useState([])
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate()

    const fetchManagerList = async() => {
        try {
            
            const response = await axiosInstance({
              method: "GET",
              url: "/manager/all-manager",
            })

            setManagers(response?.data?.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchManagerList()
        // console.log("Manager list === ", managers);
    },[])

    
   

    const handleChange = (e) => {
      const { name, value } = e.target;

      if (name === "address" || name === "city") {
        setTurfData((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            [name]: value,
          },
        }));
      } else {
        setTurfData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
        setSelectedFile(file);
      }
    };

    const handleCheckboxChange = (e, field) => {
       const { value, checked } = e.target;

       setTurfData((prevState) => {
         const currentArray = Array.isArray(prevState[field])
           ? prevState[field]
           : [];

         return {
           ...prevState,
           [field]: checked
             ? [...currentArray, value] 
             : currentArray.filter((item) => item !== value),
         };
       });
  };
  
  const handleAddNewTurf = async (e) => {
    e.preventDefault();
    
    
    const formData = new FormData()
    Object.entries(turfData).forEach(([key, value]) => {
      // console.log("inside for each loop ", value)
      if (key === "image") {
        if (selectedFile) {
          formData.append(key, selectedFile);
        }
        else {
          formData.append(key,value)
        }
      } 
      else if (key === "location") {
        formData.append("location", JSON.stringify(value));
      }
      else if (key === "availability") {
        formData.append("availability", JSON.stringify(turfData.availability));
      }
      else {
        formData.append(key, value);
      }
    })
    // console.log([...formData.entries()]);

    try {

      const response = await axiosInstance({
        method: "POST",
        url: "/turf/create-turf",
        data : formData
      });
      
      // console.log("add new turf === ", response?.data?.data)
      toast.success("New turf added successfully.....")
      setTurfData({})
      navigate("/admin/home")

    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message)
    }

  }

  const handleReset = () => {
    setTurfData({
      name: "",
      location: {
        address: "",
        city: "",
      },
      image: "",
      price: "",
      facilities: [],
      sportsType: [],
      availability: [],
      managerId: "",
    });
  };

    return (
      <>
        <Container>
          <section className="shadow p-3 mb-5 bg-body rounded">
            <h3 className="text-center">New Turf </h3>
            <Form onSubmit={handleAddNewTurf}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <div className="text-center">
                      <Image
                        src={
                          previewImage ||
                          "https://rubberflooringmats.ae/wp-content/uploads/2024/05/Football-Artificial-1.jpg"
                        }
                        thumbnail
                        width="300"
                        height="300"
                        className="mb-3"
                      />
                    </div>
                    <Form.Label>Image URL</Form.Label>
                    <Form.Group>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Form.Group>
                  </Form.Group>
                </Col>
                <Col>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={turfData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={turfData?.location?.address}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={turfData.location.city}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Price / Hour </Form.Label>
                        <Form.Control
                          type="number"
                          name="price"
                          value={turfData.price}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Manager</Form.Label>
                    <Form.Select
                      name="managerId"
                      value={turfData.managerId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a manager</option>
                      {managers.map((manager) => (
                        <option key={manager._id} value={manager._id}>
                          {manager.fname}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Facilities : </Form.Label>
                    <br></br>
                    {facilitiesList.map((facility, index) => (
                      <Form.Check
                        inline
                        key={index}
                        type="checkbox"
                        label={facility}
                        value={facility}
                        checked={turfData.facilities.includes(facility)}
                        onChange={(e) => handleCheckboxChange(e, "facilities")}
                      />
                    ))}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Sports Type</Form.Label>
                    <br></br>
                    {sportsTypeList.map((sport, index) => (
                      <Form.Check
                        inline
                        key={index}
                        type="checkbox"
                        label={sport}
                        value={sport}
                        checked={turfData.sportsType.includes(sport)}
                        onChange={(e) => handleCheckboxChange(e, "sportsType")}
                      />
                    ))}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Available Time</Form.Label>

                    <div>
                      {availableHours.map((hour, index) => {
                        const isSelected = turfData.availability.some(
                          (item) => item.slots === hour && item.isAvailable
                        );

                        return (
                          <Button
                            key={index}
                            className="mb-2 me-1"
                            type="button"
                            variant={isSelected ? "success" : "outline-success"}
                            value={hour}
                            onClick={() =>
                              setTurfData((prev) => {
                                const updatedAvailability =
                                  prev.availability.some(
                                    (item) => item.slots === hour
                                  )
                                    ? prev.availability.map((item) =>
                                        item.slots === hour
                                          ? {
                                              ...item,
                                              isAvailable: !item.isAvailable,
                                            }
                                          : item
                                      )
                                    : [
                                        ...prev.availability,
                                        { slots: hour, isAvailable: true },
                                      ]; 

                                return {
                                  ...prev,
                                  availability: updatedAvailability,
                                };
                              })
                            }
                          >
                            {hour}
                          </Button>
                        );
                      })}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="success" type="submit">
                  Add Turf
                </Button>
                <Button
                                variant="success"
                                onClick={handleReset}
                              >
                                Cancel
                              </Button>
              </div>
            </Form>
          </section>
        </Container>
      </>
    );
}

export default NewTurfPage