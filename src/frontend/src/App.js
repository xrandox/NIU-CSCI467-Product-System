/**
 * This file contains the frontend App
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages and Components
import Home from "./pages/Home";
import Store from "./pages/Store";
import Inventory from "./pages/Inventory/Inventory";
import Login from "./pages/Login";
import AdminTools from "./pages/AdminTools";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";

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
            <Route path="/cart/" element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
