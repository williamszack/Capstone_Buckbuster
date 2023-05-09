//persistent--not it's own route
//child of App.js
import image from '../pictures/bb-donkey.png'
import React, { useEffect, useState } from 'react'
import '../css/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'


const Navbar = () => {

  const isAuthenticated = !!localStorage.getItem("token");
  const user = localStorage.getItem("user")
  const isAdmin = localStorage.getItem("isAdmin")
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
          {!isAuthenticated && <Link to="/login">Login</Link>}
          {!isAuthenticated && <Link to="/register">Register</Link>}
          {isAdmin === 'true' && <Link className='adminView' to='/adminPage'>AdminView</Link>}
          {isAuthenticated && <Link to="/cart">Cart</Link>}
          <Link to="/">Home</Link>
          {isAuthenticated && <Link to="/profile">Profile</Link>}
          {isAuthenticated && <a className="logout--button" onClick={handleLogout} href="..">Logout</a>}
        </div>
      </nav>
    </div>
  );
};

export default Navbar