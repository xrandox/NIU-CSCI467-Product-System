import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import authorization from "../components/Auth";

const Profile = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  }

  return (
    <div className="profile">
      <h2>Your Profile</h2>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default authorization(Profile, ["user", "employee", "admin"]);
