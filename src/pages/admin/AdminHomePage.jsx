import React from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import AdminTurf from '../../components/admin/AdminTurf';

function AdminHomePage() {
  return (
    <>
      <Container className="mt-3 vh-100">
        <Row>
          <Col xs={12} sm={12} md={6}>
            <section className="shadow p-3 mb-5 bg-body rounded">
              <div>
                <h1 className="text-center">Turf Management</h1>
                <div className="d-grid justify-content-center">
                  <Button
                    type="button"
                    variant="success"
                    className="btn btn-primary btn-lg shadow-sm"
                    style={{ width: 200 }}
                  >
                    New Turf
                  </Button>
                </div>
              </div>
            </section>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <section className="shadow p-3 mb-5 bg-body rounded">
              <div>
                <h1 className="text-center">Manager Management</h1>
                <div className="d-grid justify-content-center">
                  <Button
                    variant="success"
                    type="button"
                    className="shadow-sm btn btn-primary btn-lg"
                    style={{ width: 200 }}
                  >
                    New Manager
                  </Button>
                </div>
              </div>
            </section>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
            <section className="shadow p-3 mb-5 bg-body rounded">
              <AdminTurf />
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminHomePage