import React from "react";
import { Link, Navigate } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

const ProtectedRoute = ({ children, isLoggedIn }) => {
if (isLoggedIn === null) {
  return (<>
  <Preloader />
  <Link to='/' className='home-link'>На главную</Link>
  </>)
}
  return isLoggedIn
  ? (children)
  : (<Navigate to="/sign-in" />);
}

export default ProtectedRoute;
