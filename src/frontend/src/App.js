/**
 * This file contains the frontend App
 */

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

//Pages and Components
import Home from "./pages/Home";
import Store from "./pages/Store";
import Inventory from "./pages/Inventory/Inventory";
import Login from "./pages/Login";
import AdminTools from "./pages/AdminTools";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

import Receiving from "./pages/Receiving";
import Shipping from "./pages/Shipping";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store/" element={<Store />} />
            <Route path="/inventory/" element={<Inventory />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/admin/" element={<AdminTools />} />
            <Route path="/profile/" element={<Profile />} />

            <Route path="/receiving/" element={<Receiving />} />
            <Route path="/shipping/" element={<Shipping />} />
          </Routes>
        </div>
        <Link to="/receiving/">
            <h1>Receiving</h1>
        </Link>
        <Link to="/shipping/">
            <h1>Shipping</h1>
        </Link>
      </BrowserRouter>
    </div>
  );
}

export default App;
