import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setUser } from "state";
import { useReAuthenticateUserQuery } from "state/api";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.global.user);
  const skip = Boolean(user);
  const { data, isLoading } = useReAuthenticateUserQuery(1, { skip: skip });
  let location = useLocation();
  const dispatch = useDispatch();
  // console.log(data);
  console.log("Incoming");

  useEffect(() => {
    // console.log("data", data);
    if (data) {
      dispatch(setUser(data));
    }
  }, [isLoading]); //eslint-disable-line react-hooks/exhaustive-deps

  if (!isLoading && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
