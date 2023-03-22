/**
 * This file contains the code for the Navbar component shown on every page
 */

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Product Store</h1>
        </Link>
        <Link to="/store">
          <h1>Store Page</h1>
        </Link>
        <Link to="/inventory/">
          <h1>Inventory</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
