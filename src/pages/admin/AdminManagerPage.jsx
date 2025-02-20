import React, { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Button, ButtonGroup, Col, Container, Form, ListGroup, ListGroupItem, Modal, Row, Table } from 'react-bootstrap';
import { BsEye, BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import NewManager from './NewManager';
import toast from 'react-hot-toast';

function AdminManagerPage() {
  const [refreshState , setRefreshState] = useState(true)
  const [managerList, isLoading, error] = useFetch("/manager/all-manager",refreshState);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [managerId, setManagerId] = useState()
  const [step, setStep] = useState(1);
  const [assignedTurf, setAssignedTurf] = useState({})
  const [selectedManager, setSelectedManager] = useState("");
  const [availableManager, setAvailableManager] = useState();
  const navigate = useNavigate()

  const fetchAssignedTurf = async (managerId) => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: `/turf/assigned-turf/${managerId}`,
        });
          // console.log("assigned turf ==== ", response?.data?.data);
          setAssignedTurf(response?.data?.data)
      } catch (error) {
        console.log(error);
      }
  };
  
  const handleProceed = async () => {
    try {
      // console.log("inside proceed")
      const available = managerList?.filter((manager) => manager._id !== managerId);
      setAvailableManager(available)
      // console.log("Available Managers ===== ", availableManager)
    } catch (error) {
      console.log(error)
    }
  }
  

  const handleDelete = async (managerId) => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url : `/manager/deactivate-manager/${managerId}`
      })
      toast.success("Manager deleted successfully");
      setStep(1)
      setShowDeleteModal(false);
      setRefreshState((prev)=>!prev)
    } catch (error) {
      toast.error("Error deleting manager");
      console.error(error);
    }
  };

  const handleReassign = async() => {
    try {
      if (selectedManager) {
        const response = await axiosInstance({
          method: "PUT",
          url: "/turf/reassign-manager",
          data: {
            oldManager: managerId,
            newManager : selectedManager
          }
        })
          toast.success("Turf reassigned successfully....")
          handleDelete(managerId);
        }
    } catch (error) {
      toast.error("Error in reassigning.... please try again ")
      setStep(1)
      console.log(error)
    }

  }
    // console.log(managerList)
  return (
    <Container>
      {managerList?.length === 0 ? (
        <>
          <p className="text-danger">No pending bookings</p>
        </>
      ) : (
        <Container>
          <Row>
            <Col sm={12}>
              <h1 className="text-center">Managers List</h1>
              <Table striped bordered hover responsive>
                <thead>
                  <tr className="text-center fw-bold">
                    <td>#</td>
                    <td>Name</td>
                    <td style={{ width: "120px", textAlign: "center" }}>
                      Actions
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {managerList?.map((manager, index) => {
                    return (
                      <tr key={manager?._id}>
                        <td>{index + 1}</td>
                        <td>
                          {manager?.fname} {manager?.lname}
                        </td>
                        <td className="d-inline-flex align-items-center gap-1">
                          <Button variant="success" onClick={() => {
                            navigate(`/admin/manager-details/${manager?._id}`)
                          }}>
                            <BsEye />
                          </Button>
                          <Button variant="primary" onClick={() => {
                            navigate(`/admin/manager-details/${manager?._id}`)
                          }}>
                            <BsPencilSquare />
                          </Button>
                          <Button variant="danger" onClick={async() => {
                            try {
                              setManagerId(manager?._id)
                              await fetchAssignedTurf(manager?._id);  
                              setShowDeleteModal(true); 
                            } catch (error) {
                              console.log("Error fetching assigned turf:", error);
                            }
                          }}>
                            <BsTrash />
                          </Button>
                        </td>
                        <Modal show={showDeleteModal} onHide={() => {
                          setShowDeleteModal(false)
                          setStep(1)
                        }} centered
                          className="transparent-modal"
                          backdropClassName="transparent-modal">
                          <Modal.Header closeButton>
                            <Modal.Title>
                            {step === 1 ? "Confirm Deletion" : "Reassign Turfs Before Deleting" }
                            </Modal.Title>
                            </Modal.Header>
                          <Modal.Body>
                            {step === 1 ? (
                              <div>
                                <p>Are you sure you want to delete this manager?</p>
                                {assignedTurf?.length > 0 ? <p> The manager has assigned turfs, you will need to reassign them.</p> : <></>}
                              </div>) :
                              (<>
                                <p>This manager is assigned to the following turfs:</p>
                                <ul>
                                    {assignedTurf?.map((turf) => (
                                      <li key={turf._id}>{turf.name}</li>
                                    ))}
                                </ul>
                                <Form.Group>
                                    <Form.Label>Select a new manager for reassignment:</Form.Label>
                                    <Form.Select value={selectedManager} onChange={(e) => setSelectedManager(e.target.value)}>
                                      <option value="">Select Manager</option>
                                      {availableManager?.map((manager) => (
                                        <option key={manager?._id} value={manager?._id}>
                                          {manager?.fname} {manager?.lname}
                                        </option>
                                      ))}
                                    </Form.Select>
                                </Form.Group>
                              </>)}
                          </Modal.Body>
                          
                          <Modal.Footer>
                            {step === 1 ? <>
                              <Button variant="secondary" onClick={() => {
                                setShowDeleteModal(false)
                                setStep(1)
                              }}>Cancel</Button>
                              {assignedTurf?.length > 0 ? <>
                                <Button variant="danger" onClick={() => {
                                  setStep(2)
                                  handleProceed()
                                }}>Proceed</Button>
                              </> : <>
                                <Button variant="danger" onClick={() => handleDelete(managerId) }>Delete</Button>
                              </>}
                            </> : <>
                                <Button variant="secondary" onClick={() => {
                                  setStep(1)
                                  setShowDeleteModal(false)
                                }}>Cancel</Button>
                                <Button variant="success" onClick={handleReassign}>Reassign & Delete</Button>
                            </>}
                              {/* <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                              </Button>
                              <Button variant="danger" onClick={confirmDelete}>
                                Delete
                              </Button> */}
                            </Modal.Footer>
                          </Modal>
                      </tr>
                    );
                  })}
                  </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
}

export default AdminManagerPage