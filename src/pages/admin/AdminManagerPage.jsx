import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Button, ButtonGroup, Col, Container, ListGroup, ListGroupItem, Row, Table } from 'react-bootstrap';
import { BsEye, BsPencilSquare, BsTrash } from 'react-icons/bs';

function AdminManagerPage() {
    const [managerList, isLoading, error] = useFetch("/manager/all-manager");
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
                          <Button variant="success">
                            <BsEye />
                          </Button>
                          <Button variant="primary">
                            <BsPencilSquare />
                          </Button>
                          <Button variant="danger">
                            <BsTrash />
                          </Button>
                        </td>
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