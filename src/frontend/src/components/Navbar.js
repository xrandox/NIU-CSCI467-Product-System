/**
 * This file contains the code for the Navbar component shown on every page
 */
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const { role } = token ? jwt_decode(token) : "";

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Home</h1>
        </Link>
        <Link to="/store/">
          <h1>Store</h1>
        </Link>
        {["employee", "admin"].includes(role) && (
          <Link to="/shipping/">
            <h1>Shipping</h1>
          </Link>
        )}
        {["employee", "admin"].includes(role) && (
          <Link to="/receiving/">
            <h1>Receiving</h1>
          </Link>
        )}
        {["admin"].includes(role) && (
          <Link to="/admin/">
            <h1>Admin Tools</h1>
          </Link>
        )}
        {["user"].includes(role) && (
          <Link to="/Cart/">
            <h1>Cart</h1>
          </Link>
        )}
        {token ? (
          <button onClick={logout}>
            <h1>Logout</h1>
          </button>
        ) : (
          <Link to="/login/">
            <h1>Login</h1>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
