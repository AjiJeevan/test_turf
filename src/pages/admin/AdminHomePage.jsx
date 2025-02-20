import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Modal, Row } from 'react-bootstrap';
import AdminTurf from '../../components/admin/AdminTurf';
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';
import TurfPlaceholder from '../../components/shared/TurfPlaceholder';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';

function AdminHomePage() {

  
  const navigate = useNavigate()
  const [selectedTurfId, setSelectedTurfId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshState, setRefreshState] = useState(false);
  let [turfList, isLoading, error] = useFetch("/turf/all-turf",refreshState);

  const handleNewTurf = () => {
    navigate("admin/new-turf")
  }

  const handleShowModal = (turfId) => {
    setSelectedTurfId(turfId);
    setShowModal(true);
  };

  const handleDelete= async () => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url : `/turf/delete-turf/${selectedTurfId}`
      })

      turfList = turfList.filter((turf) => turf._id !== selectedTurfId)
      setShowModal(false);
      setRefreshState((prev) => !prev);
      toast.success("Turf deleted successfully");
    } catch (error) {
      toast.error("Error in deleting turf")
    }
  }
  
  // console.log(turfList)

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col xs={12} sm={12} md={6}>
            <section className="shadow p-3 mb-5 bg-body rounded">
              <div>
                <h3 className="text-center">Turf Management</h3>
                <div className="d-grid justify-content-center">
                  <Button
                    type="button"
                    variant="success"
                    className="btn btn-primary btn-sm shadow-sm"
                    style={{ width: 300 }}
                    onClick={() => {
                      navigate("/admin/new-turf");
                    }}
                  >
                    Add New Turf
                  </Button>
                </div>
              </div>
            </section>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <section className="shadow p-3 mb-5 bg-body rounded">
              <div>
                <h3 className="text-center">Manager Management</h3>
                <div className="d-grid justify-content-center">
                  <Button
                    variant="success"
                    type="button"
                    className="shadow-sm btn btn-primary btn-sm"
                    style={{ width: 300 }}
                    onClick={() => {
                      navigate("/admin/new-manager");
                    }}
                  >
                    Add New Manager
                  </Button>
                </div>
              </div>
            </section>
          </Col>
        </Row>
        {isLoading ? (
          <>
            <TurfPlaceholder />
          </>
        ) : (
          <>
            <Row>
              {turfList?.map((turf, index) => {
                return (
                  <Col
                    key={turf?._id}
                    xs={12}
                    sm={12}
                    md={6}
                    lg={4}
                    xl={3}
                    xxl={3}
                  >
                    {/* {console.log(turf)} */}
                    <section className="shadow p-3 mb-5 bg-body rounded">
                      <AdminTurf turfInfo={turf} onShowModal={handleShowModal} />
                    </section>
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
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
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </Container>
    </>
  );
}

export default AdminHomePage