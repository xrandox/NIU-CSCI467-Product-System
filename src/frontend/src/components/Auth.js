import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function authorization(Component, allowedRoles) {
  return function authorization(props) {
    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/login" />;
    }

    const { role } = jwt_decode(token);

    if (!allowedRoles.includes(role)) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };
}

export default authorization;
