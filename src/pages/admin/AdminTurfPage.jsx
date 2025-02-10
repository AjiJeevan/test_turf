import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';
import AdminTurf from '../../components/admin/AdminTurf';
import TurfPlaceholder from '../../components/shared/TurfPlaceholder';

function AdminTurfPage() {
// const fetchTurf = useFetch("/turf/all-turf");
  // const turfList = useSelector((state) => state.turf.value);
  const [turfList,isLoading,error] = useFetch("/turf/all-turf");
console.log("turfdfds", turfList)
    
  return (
    <>
      <Container>
        {isLoading ? <TurfPlaceholder /> :
          <Row>
            {turfList?.map((turf, index) => {
              return (
                <Col key={turf?._id} xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
                  <section className="shadow p-3 mb-5 bg-body rounded">
                    <AdminTurf turfInfo={turf} />
                  </section>
                </Col>
              );
            })}
          </Row>}
      </Container>
    </>
  );
}

export default AdminTurfPage