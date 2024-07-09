import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { checkUser } from "../utils/checkuser";
import { userLogin, startLoading, stopLoading } from "../redux/myslice";

const ProtectedRoute: React.FC = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const mycheck = async () => {
      try {
        const response = await checkUser();
        if (response.user) {
          dispatch(userLogin(response.user));
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
        return;
      }
    };
    if (!user.login && document.cookie.length > 0) {
      dispatch(startLoading());
      mycheck();
      dispatch(stopLoading());
    } else if (!user.login && document.cookie.length === 0) {
      navigate("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render the nested routes if the user is authenticated
  return <Outlet />;
};

export default ProtectedRoute;
