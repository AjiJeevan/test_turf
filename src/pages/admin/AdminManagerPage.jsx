import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Button, ButtonGroup, Container, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import { BsEye, BsPencilSquare, BsTrash } from 'react-icons/bs';

function AdminManagerPage() {
    const [managerList, isLoading, error] = useFetch("/manager/all-manager");
    console.log(managerList)
  return (
    <div>
      <Container>
        {!managerList ? (
          <></>
        ) : (
                      <div>
                          <h1 className='text-center'>Managers List</h1>
            <Table striped bordered hover>
              <tbody>
                {managerList?.map((manager, index) => {
                  return (
                    <tr className='text-center' key={manager?._id}>
                      <td>{index + 1}</td>
                      <td className="d-flex justify-content-between">
                        <div>
                          {manager?.fname} {manager?.lname}
                        </div>
                        <div className="d-flex justify-content-start">
                          <ButtonGroup
                            className="btn-sm"
                            aria-label="Turf-options"
                          >
                            <Button variant="secondary">
                              <BsEye />
                            </Button>
                            <Button variant="secondary">
                              <BsPencilSquare />
                            </Button>
                            <Button variant="secondary">
                              <BsTrash />
                            </Button>
                          </ButtonGroup>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AdminManagerPage