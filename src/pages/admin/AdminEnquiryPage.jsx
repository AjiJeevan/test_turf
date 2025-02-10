import React from 'react'
import { useFetch } from '../../hooks/useFetch';
import { Badge, Button, ButtonGroup, Container, Table } from 'react-bootstrap';
import { BsEye, BsPencilSquare, BsTrash } from 'react-icons/bs';

function AdminEnquiryPage() {
    const [enquiryList, isLoading, error] = useFetch("/enquiry/all-enquiry");
    console.log("Enquiries ====== ", enquiryList )
  return (
    <div>
      <Container>
        {!enquiryList ? (
          <></>
        ) : (
          <div>
            <h1 className="text-center">Enquiries</h1>
            <Table striped bordered hover>
              <tbody>
                {enquiryList?.map((enquiry, index) => {
                  return (
                    <tr className="text-center" key={enquiry?._id}>
                      <td>{index + 1}</td>
                      <td>
                        <b>{enquiry?.email}</b>
                      </td>
                      <td className="d-flex justify-content-between">
                        <div>{enquiry?.enquiry}</div>
                        <div className="d-flex gap-2 justify-content-start">
                          <div className='mt-1'>
                            {" "}
                            {enquiry?.status == "pending" ? (
                              <>
                                <h5>
                                  <Badge bg="warning" text="dark">
                                    Pending
                                  </Badge>
                                </h5>
                              </>
                            ) : (
                              <>
                                <h5>
                                  <Badge bg="success" text="dark">
                                    Replied
                                  </Badge>
                                </h5>
                              </>
                            )}
                          </div>

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

export default AdminEnquiryPage