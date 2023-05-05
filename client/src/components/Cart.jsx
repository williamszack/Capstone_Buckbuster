//child of App.js
import React, { useState, useEffect } from "react";
import { getUsersCart, removeItem } from "../api/cart";
import '../css/Cart.css'

const Cart = () => {
const [cartItems, setCartItems] =useState([])

const handleDelete =  async (product_id) => {
  const user_id = localStorage.getItem("user_id")
  
  try{
    const response = await removeItem( product_id, user_id)
    console.log(response)
    const updateCart = await getUsersCart()
    setCartItems(updateCart)
  } catch(err){
    console.error(err)
  }
}

  useEffect(() => {
const fetchUserCart = async()=>{
  const data = await getUsersCart()
  setCartItems(data)
}
 fetchUserCart()
  },[])

  if (cartItems.length === 0) {
    return (
      <h2>No items in cart!</h2>
    )
  }

  return (
  <div className='shoppingPage--container'>
    <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div className='cartItem--container'>
        <img className='image' src={item.image_url} alt="movieImage"></img>

        <div>
        <h2>Title</h2>
        <p>{item.name}</p>
        </div>

        <div>
          <h2>Price</h2>
          <p>{item.price}</p>
        </div>
        <button className="delete--btn"
        value={item.product_id}
        onClick={e => {
          const product_id = (e.target.value)
          handleDelete(product_id)
        }}
        >delete</button>
  </div>
))}

<button className="checkout--btn">Check Out</button>

</div> 
  )
}

export default Cart