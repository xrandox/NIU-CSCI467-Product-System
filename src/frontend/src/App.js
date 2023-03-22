/**
 * This file contains the frontend App
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages and Components
import Home from "./pages/Home";
import Store from "./pages/Store";
import Inventory from "./pages/Inventory/Inventory";
import Navbar from "./components/Navbar";

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
