import React from "react";
import { Link, Navigate } from "react-router-dom";
import LoggedOut from "../LoggedOut/LoggedOut";
import Preloader from "../Preloader/Preloader";

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (isLoggedIn === null) {
    return <LoggedOut />
  }
  return isLoggedIn
    ? (children)
    : (<Navigate to="/sign-in" />);
}

export default ProtectedRoute;
