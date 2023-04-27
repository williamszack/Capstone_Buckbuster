import React from 'react'
import '../css/AdminPage.css'
import { useEffect, useState } from 'react'
import { getAllUsers, getAllOrders } from '../api/AdminPage'

//child of App.js

//adding new products


//deactivate products

//reactivate products





const AdminPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);


//viewing all users - done
  useEffect(() => {
    const fetchAllUsers = async () => {
      const result = await getAllUsers();
      setAllUsers(result);
    }
    fetchAllUsers();
  }, [])

 //view all orders
  useEffect(() => {
    const fetchAllOrders = async () => {
      const result = await getAllOrders();
      setAllOrders(result);
    }
    fetchAllOrders();
  }, [])
  console.log("allorders", allOrders);
  

  return (
    <div>
      <h1>AdminPage</h1>
      <h2>Users</h2>
      <ul className="user-table">
      <div className="user-table-header">
        <p><strong>User ID</strong></p>
        <p><strong>Name</strong></p>
        <p><strong>Email</strong></p>
        <p><strong>Username</strong></p>
        <p><strong>Password</strong></p>
        <p><strong>Admin</strong></p>
      </div>
      {allUsers.map((user) => (
        <li key={user._id} className={user.admin === true ? "admin-row user-table-row" : "user-table-row"}>
          <p>{user.user_id}</p>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.username}</p>
          <p>{user.password}</p>
          <span>{user.admin === true ? <span><strong>Yes</strong></span> : <span>No</span>}</span>
        </li>
        ))}
      </ul>
      <br />
      <h2>Orders</h2>
    </div>
  )
}

export default AdminPage
