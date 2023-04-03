import React from "react";
import { Link } from "react-router-dom";
import LoggedOut from "../LoggedOut/LoggedOut";

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (isLoggedIn === null) {
    return (<LoggedOut />)
  }
  return isLoggedIn
    ? (children)
    : (<Link to="/sign-in" />);
}

export default ProtectedRoute;
