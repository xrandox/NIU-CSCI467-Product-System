/**
 * This file contains the code for the Navbar component shown on every page
 */
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Home</h1>
        </Link>
        <Link to="/store/">
          <h1>Store Page</h1>
        </Link>
        <Link to="/inventory/">
          <h1>Inventory</h1>
        </Link>
        <Link to="/admin/">
          <h1>Admin Tools</h1>
        </Link>
        <Link to="/login/">
          <h1>Login</h1>
        </Link>
        <Link to="/Cart/">
          <h1>Cart</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
