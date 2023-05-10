import React, { useState, useEffect, useCallback } from 'react'
import { getUsersOrders } from '../api/Profile'
import { getUsersCart } from '../api/cart'
import '../css/Profile.css'
//child of App.js

//display user information

//display order history for user

const Profile = () => {
  const [usersOrders, setUsersOrders] = useState([])
  const username = localStorage.getItem("user")
  console.log(username, "username1") 

  
  // const fetchUserOrders = useCallback (async() => {
  //   const data = await getUsersOrders(user_id)
  //   setUsersOrders(data)
  //   },[])


  useEffect(() => { 
    const fetchUserOrders = async() => {
      const data = await getUsersOrders()
      setUsersOrders(data)
      }
    
      fetchUserOrders()
 
  }, [])

  console.log("this is my useState", usersOrders)

  return (
    <div>
      <h2>Profile</h2>
    <div>
      <h3>Order History</h3>
      {usersOrders.map((order) => (
        <div key={order.order_id} className='mappedorders'>
      <p>Date: {order.order_date.slice(0, 10)}</p>
      <p>Name: {order.name}</p>
      <img className='image' src={order.image_url} alt="movieimage"/>
      </div>
      ))}
    </div>
</div>
)}

export default Profile;
