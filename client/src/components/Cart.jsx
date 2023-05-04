//child of App.js
import React, { useState, useEffect } from "react";
import { getUsersCart } from "../api/cart";
import '../css/Cart.css'

const Cart = () => {
const [cartItems, setCartItems] =useState([])

  useEffect(() => {
const fetchUserCart = async()=>{
  const data = await getUsersCart()
  setCartItems(data)

}
 fetchUserCart()
  },[])

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

  </div>
))}
<button className="checkout--btn">Check Out</button>
</div> 
  )
}

export default Cart