import React from 'react'
import { Button, Card, Container } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { BsEye, BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function AdminTurf({ turfInfo, onShowModal }) {
  const navigate = useNavigate()

  const handleViewTurf = async (turfId) => {
    try {
      navigate(`/admin/turf-details/${turfId}`)
      
    } catch (error) {
      toast.error("Error in loading Turf Details")
    }
  }

  return (
    <Container>
      {/* {console.log("Turf details in component===== ", turfInfo)} */}
      <Card className="p-2 mt-0" style={{ height: "400px" }}>
        <Card.Img
          variant="top"
          src={turfInfo?.image}
          style={{ height: "200px", objectFit: "contain" }}
          className="mt-0 p-0"
        />
        <Card.Body>
          <div className="align-items-center d-grid justify-content-center">
            <Card.Title>{turfInfo?.name}</Card.Title>
            <Card.Text>
              <b>AED {turfInfo?.price} / Hour</b>
            </Card.Text>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button
              variant="success"
              className="bt-sm me-2"
              onClick={() => {
                handleViewTurf(turfInfo?._id);
              }}
            >
              <BsEye />
            </Button>
            <Button variant="primary" className="bt-sm me-2" onClick={() => {
                              navigate(`/admin/turf-edit/${turfInfo?._id}`);
                          }}>
              <BsPencilSquare />
            </Button>
            <Button
              variant="danger"
              className="bt-sm me-2"
              onClick={() => onShowModal(turfInfo?._id)}
            >
              <BsTrash />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminTurf