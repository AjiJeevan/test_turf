import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MainBanner() {
    const navigate = useNavigate()
  return (
    <>
      <div className="main-section text-center ">
        <h1 className="text-white">Make Every Match Memorable</h1>
              <Button variant="success" onClick={() => {
                  navigate("/sign-up")
        }}>SIGN UP NOW</Button>
      </div>
    </>
  );
}

export default MainBanner