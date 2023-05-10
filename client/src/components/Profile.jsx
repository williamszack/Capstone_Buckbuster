import React, { useState, useEffect } from 'react'
import { getUsersOrders } from '../api/Profile'
import '../css/Profile.css'
//child of App.js

const Profile = () => {
  const [usersOrders, setUsersOrders] = useState([])
  const username = localStorage.getItem("user")
  console.log(username, "username1") 


  useEffect(() => { 
    const fetchUserOrders = async() => {
      const data = await getUsersOrders()
      setUsersOrders(data)
      }
    
      fetchUserOrders()
 
  }, [])
  console.log(usersOrders)


  return (
    <div>
      <h2>Profile</h2>
    <div>
      <h3>Order History</h3>
      {usersOrders.length == null ? <h1>no items</h1> :
      usersOrders.map((order) => (
        <div key={order.order_id} className='mappedorders'>
      <p>Date: {order.order_date.slice(0, 10)}</p>
      <p>Name: {order.name}</p>
      <img className='image' src={order.image_url} alt="movieimage"/>
      </div>
      ))
    }
    </div>
</div>
)}

export default Profile;
