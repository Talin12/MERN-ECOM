import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  // Get the user's login information from the Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // If the user is logged in, render the child component (via Outlet)
  // Otherwise, redirect them to the login page
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;