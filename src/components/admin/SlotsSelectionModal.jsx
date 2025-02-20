import React, { useEffect, useState } from 'react'
import { Button, Col, ListGroup, Modal, Row } from 'react-bootstrap'

function SlotsSelectionModal({ show, handleClose, selectedSlots, availableSlots, onSave }) {
    const [available, setAvailable] = useState([])
    const [selected, setSelected] = useState([])

  useEffect(() => {
    setAvailable(availableSlots)
    setSelected(selectedSlots)
  }, [availableSlots, selectedSlots])
    
  const moveToSelected = (slot) => {
    setAvailable(available.filter((s) => s !== slot))
    setSelected([...selected, slot])
    }
    
    const moveToAvailable = (slot) => {
        setSelected(selected.filter((s) => s !== slot))
        setAvailable([...available, slot])
      }
    
  return (
      <>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Select Available Slots</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Row>
                      <Col md={6}>
                          <h5>Available Slots</h5>
                          <ListGroup>
              {available?.length > 0 ? (
                available?.map((slot, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    variant="light"
                    onClick={() => moveToSelected(slot)}
                  >
                    {slot}
                  </ListGroup.Item>
                ))
              ) : (
                <p className="text-danger">No slots available</p>
              )}
            </ListGroup>
                          
                      </Col>
                      <Col md={6}>
                          <h5>Selected Slots</h5>
                          <ListGroup>
              {selected?.length > 0 ? (
                selected?.map((slot, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    variant="success"
                    onClick={() => moveToAvailable(slot)}
                  >
                    {slot}
                  </ListGroup.Item>
                ))
              ) : (
                <p className="text-muted">No slots selected</p>
              )}
            </ListGroup>
                      </Col>
                  </Row>
              </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="success" onClick={() => onSave(selected)}>
                    Save Slots
                </Button>
            </Modal.Footer>
 
          </Modal>
      </>
  )
}

export default SlotsSelectionModal