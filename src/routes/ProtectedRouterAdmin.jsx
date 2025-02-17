import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const ProtectedRouterAdmin = () => {
  const navigate = useNavigate();
  const isUserAuth = useSelector((state) => state.user.isUserAuth);
  const location = useLocation();

  // useEffect(() => {
    // console.log("isAuthUser in Portected Router Admin ======", isUserAuth);
    if (! isUserAuth) {
      navigate("login");
      return;
    }
  // }, []);

  return <Outlet />;
};
