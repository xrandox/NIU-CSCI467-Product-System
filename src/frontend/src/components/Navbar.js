/**
 * This file contains the code for the Navbar component shown on every page
 */
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Navbar = () => {
    const token = localStorage.getItem("token");
    const {role} = token ? jwt_decode(token) : "user";

    return (
        <header>
        <div className="container">
            <Link to="/">
                <h1>Home</h1>
            </Link>
            <Link to="/store/">
                <h1>Store</h1>
            </Link>
            {["employee", "admin"].includes(role) &&
                <Link to="/inventory/">
                    <h1>Inventory</h1>
                </Link>
            }
            {["employee", "admin"].includes(role) &&
                <Link to="/shipping/">
                    <h1>Shipping</h1>
                </Link>
            }
            {["employee", "admin"].includes(role) &&
                <Link to="/receiving/">
                    <h1>Receiving</h1>
                </Link>
            }
            {["admin"].includes(role) &&
                <Link to="/admin/">
                    <h1>Admin Tools</h1>
                </Link>
            }
            <Link to="/Cart/">
                <h1>Cart</h1>
            </Link>
            <Link to="/login/">
                <h1>Login</h1>
            </Link>
        </div>
        </header>
    );
};

export default Navbar;
