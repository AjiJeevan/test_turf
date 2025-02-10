import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useFetch } from '../../hooks/useFetch'
import { axiosInstance } from '../../config/axiosInstance';
import TurfPlaceholder from '../../components/shared/TurfPlaceholder';
import Booking from '../../components/manager/Booking';

function ManagerBookingPage() {
    const [turfList, isLoading, error] = useFetch("/manager/assigned-turf");
    console.log("In manager booking Page ===== ",turfList)

  return (
    <>
      {isLoading ? (
        <>
          <TurfPlaceholder />
        </>
      ) : (
        <>
          <Container>
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
                      <Booking turfInfo={turf} />
                    </section>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      )}
      {/* <Container>
              {
                  turfList.map((turf, index) => {
                      return (
                              fetchBookingLists(turf._id)
                      )
                  })
              }
          </Container> */}
    </>
  );
}

export default ManagerBookingPage