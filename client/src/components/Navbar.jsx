//persistent--not it's own route
//child of App.js
import image from '../pictures/bb-donkey.png'
import React from 'react'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src={image} alt="Logo"/>
          <h1 className='title'>Buckbuster</h1>
        </div>
        <div className="links">
          <Link to="/login"><a href="login">Login</a></Link>
          <Link to="/register"><a href="register">Register</a></Link>
          <Link to="/cart"><a href="cart">Cart</a></Link>
          <Link to="/"><a href="home">Home</a></Link>
          <a href="..">Profile</a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar