import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Turf from '../../components/shared/Turf';
import { setTurfLists } from '../../app/features/turf/turfSlice';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../config/axiosInstance';

function TurfDisplay() {
  const turfList = useSelector((state) => state.turf.value);
  const dispatch = useDispatch();

  const fetchTurfs = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/turf/all-turf",
      });
      console.log(response.data);
      dispatch(setTurfLists(response?.data?.data));
      // setTurfList(response?.data?.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, []);
  return (
    <>
      <Container className='mt-0 py-3'>
        <Row>
          {turfList?.map((turf, index) => {
            return (
              <Col key={turf?._id} xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
                {console.log(turf)}
                <Turf turfInfo={turf} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default TurfDisplay