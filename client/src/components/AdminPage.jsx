import React from 'react'
import '../css/AdminPage.css'
import { useEffect, useState, Fragment } from 'react'
import { getAllUsers, getAllOrders, addProduct } from '../api/AdminPage'

//child of App.js

//deactivate products

//reactivate products





const AdminPage = () => {

  //viewing all users - done
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const result = await getAllUsers();
      setAllUsers(result);
    }
    fetchAllUsers();
  }, [])
  
  //view all orders
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      const result = await getAllOrders();
      setAllOrders(result);
    }
    fetchAllOrders();
  }, [])
  console.log("allorders", allOrders);
  
  const ordersByDate = allOrders.reduce((accumulator, order) => {
    const date = order.order_date;
    if (accumulator[date]) {
      accumulator[date].push(order);
    } else {
      accumulator[date] = [order];
    }
    return accumulator;
  }, {});

  //adding new products
  // { token, name, description, price, genre, quantity, image_url, active }
  const [newMovie, setNewMovie] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [active, setActive] = useState("");

  // useEffect(() => {
  //   const createProduct = async () => {
  //     const result = await addProduct({ name, description, price, genre, quantity, image, active });
  //     setNewMovie(result);
  //   }
  //   createProduct()
  // }, [])

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
          <span>{user.admin === true ? <span>&nbsp;Yes</span> : <span>&nbsp;No</span>}</span>
        </li>
        ))}
      </ul>
      <br />
      <h2>Orders</h2>
      <ul className="orders-table">
      <div className="orders-table-header">
        <p><strong>Order Date</strong></p>
        <p><strong>Order ID</strong></p>
        <p><strong>Name</strong></p>
        <p><strong>User ID</strong></p>
        <p><strong>Product ID</strong></p>
        <p><strong>Quantity</strong></p>
        {/* <p><strong>Order Date</strong></p> */}
      </div>
      {Object.keys(ordersByDate).map((date, index) => (
    <Fragment key={date}>
      <li className="date-row">
        {/* <p><strong>Order Date: </strong>{date}</p> */}
      </li>
      {ordersByDate[date].map((order, orderIndex) => (
        <li key={order._id} className={`order-table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
          <p className={`date ${orderIndex === 0 ? 'bold-date' : 'rest-date'}`}>{date}</p>
          <p>{order.order_id}</p>
          <p>{order.name}</p>
          <p>{order.user_id}</p>
          <p>{order.product_id}</p>
          <p>{order.quantity}</p>
          {/* <p>{order.order_date}</p> */}
        </li>
      ))}
    </Fragment>
  ))}
</ul>
    </div>
  )
}

export default AdminPage


{/* <h2>Orders</h2>
<ul className="orders-table">
<div className="orders-table-header">
  <p><strong>Order ID</strong></p>
  <p><strong>Name</strong></p>
  <p><strong>User ID</strong></p>
  <p><strong>Product ID</strong></p>
  <p><strong>Quantity</strong></p>
  <p><strong>Order Date</strong></p>
</div>
{allOrders.map((order, index) => (
  <li key={order._id} className={`user-table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
    <p>{order.order_id}</p>
    <p>{order.name}</p>
    <p>{order.user_id}</p>
    <p>{order.product_id}</p>
    <p>{order.quantity}</p>
    <p>{order.order_date}</p>
  </li>
))}
</ul> */}