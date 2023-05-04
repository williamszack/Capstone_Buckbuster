//persistent--not it's own route
//child of App.js
import image from '../pictures/bb-donkey.png'
import React, { useEffect, useState } from 'react'
import '../css/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'


const Navbar = () => {

  const isAuthenticated = !!localStorage.getItem("token");
  const user = localStorage.getItem("user")
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  } 

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src={image} alt="Logo"/>
          <h1 className='title'>Buckbuster</h1>
        </div>
        <div className="links">
          {isAuthenticated && <h2 className='loggedInUser'>Welcome {user}</h2>}
          {!isAuthenticated && <Link to="/login"><a href="login">Login</a></Link>}
          {!isAuthenticated && <Link to="/register"><a href="register">Register</a></Link>}
          <Link to="/cart"><a href="cart">Cart</a></Link>
          <Link to="/"><a href="home">Home</a></Link>
          <a href="..">Profile</a>
          {isAuthenticated && <a classname="logout--button" onClick={handleLogout} href="..">Logout</a>}
        </div>
      </nav>
    </div>
  );
};

export default Navbar