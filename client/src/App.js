import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  AdminPage,
  Cart,
  Home,
  Login,
  Modal,
  Navbar,
  OrderPage,
  Profile,
  Register,
  Reviews,
  Search,
  SingleProductView,
} from "./components";

function App() {
  const [username, setUsername] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login username={username} setUsername={setUsername} />}
        />
      </Routes>
      <button onClick={() => setShow(true)}>Show modal</button>
      <Modal show={show} onClose={() => setShow(false)}>
        {" "}
      </Modal>
    </div>
  );
}

export default App;
