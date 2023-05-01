//persistent--not it's own route
//child of App.js

import React from 'react'
import '../css/Navbar.css'
const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src="logo.png" alt="Logo" />
          <h1>Buckbuster</h1>
        </div>
        <div className="links">
          <a href="..">Login</a>
          <button>Register</button>
          <a href="..">Cart</a>
          <a href="..">Home</a>
          <a href="..">Profile</a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar