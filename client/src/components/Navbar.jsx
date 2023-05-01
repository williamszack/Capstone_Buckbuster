//persistent--not it's own route
//child of App.js
import image from '../pictures/bb-donkey.png'
import React from 'react'
import '../css/Navbar.css'
const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src={image} alt="Logo"/>
          <h1 className='title'>Buckbuster</h1>
        </div>
        <div className="links">
          <a href="..">Login</a>
          <a href="..">Register</a>
          <a href="..">Cart</a>
          <a href="..">Home</a>
          <a href="..">Profile</a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar