import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const ProtectedRouterManager = () => {
  const navigate = useNavigate();
  const isUserAuth = useSelector((state) => state.user.isUserAuth);
  const location = useLocation();

  // useEffect(() => {
    // console.log("isAuthUser in Portected Router Manager ======", isUserAuth);
    if (!isUserAuth) {
      navigate("manager/login");
      return;
    }
  // }, []);

  return <Outlet />;
};
