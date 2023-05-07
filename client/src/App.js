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
  Search,
  SingleProductView
} from "./components";

function App() {
  const [username, setUsername] = useState("");



  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/adminPage" element={<AdminPage/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orderPage" element={<OrderPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/login"
          element={<Login username={username} setUsername={setUsername} />}
        />
      </Routes>
    </div>
  );
}

export default App;
