import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom"

export const ProtectedRouter = () => {
  const navigate = useNavigate()
  const userInfo = useSelector((state) => (state.user))
  const location = useLocation()

  useEffect(() => {
      console.log("isAuthUser======",userInfo.isUserAuth)
        if (!userInfo.isUserAuth) {
          navigate("./login");
          return;
    }
    //     else {
    //       navigate(location.pathname)
    // }
    },[userInfo.isUserAuth, navigate])
    
    return <Outlet />;
    
}