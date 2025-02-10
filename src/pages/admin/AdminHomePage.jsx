import React from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import AdminTurf from '../../components/admin/AdminTurf';
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';
import TurfPlaceholder from '../../components/shared/TurfPlaceholder';

function AdminHomePage() {

  const [turfList,isLoading,error] = useFetch("/turf/all-turf");
  // const turfList = useSelector((state) => (state.turf.value))
  
  console.log(turfList)

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
                    {console.log(turf)}
                    <section className="shadow p-3 mb-5 bg-body rounded">
                      <AdminTurf turfInfo={turf} />
                    </section>
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