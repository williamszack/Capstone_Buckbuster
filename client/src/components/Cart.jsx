//child of App.js
import React, { useState, useEffect } from "react";
import { getUsersCart, removeItem } from "../api/cart";
import '../css/Cart.css'
import { submitOrder } from "../api/orders";
import { useNavigate } from "react-router-dom";
import useNotification from './ui/useNotification';

const Cart = () => {
  const { toastNotify } = useNotification();

const [cartItems, setCartItems] =useState([])
const navigate = useNavigate()

const handleDelete =  async (product_id) => {
  const user_id = localStorage.getItem("user_id")
  
  try{
    const response = await removeItem( product_id, user_id)
    console.log(response)
    const updateCart = await getUsersCart()
    setCartItems(updateCart)

    toastNotify("Product removed from cart", "success");
  } catch(err){
    console.error(err)
  }
}

const handleOrder = async () => {
  const user_id = localStorage.getItem("user_id")
  try {
    const response = await submitOrder(user_id)
    console.log("success", response)

    if (response.success) {
      const updateCart = await getUsersCart()
      setCartItems(updateCart)
      toastNotify("Order submitted!", "success")
      navigate("/profile")
    }
  } catch (error) {
    console.error(error)
  }
}

  useEffect(() => {
  const fetchUserCart = async()=>{
  const data = await getUsersCart()
  setCartItems(data)
  }
  
 fetchUserCart()
  },[])
console.log(cartItems)
  if (cartItems.length === 0) {
    return (
      <div className="noitems--cart">
        <h2>No items in cart!</h2>
        <button className="continue--shopping" onClick={() => navigate("/")}>Continue Shopping</button>
      </div>
    )
  }


  return (
  <div className='shoppingPage--container'>
    <h2 className="shopping--cart" >Shopping Cart</h2>
      {cartItems.map((item) => (
        <div className='cartItem--container' key={item.product_id}>
        <img className='image' src={item.image_url} alt="movieImage"></img>

        <div className="product--title">
        <h2>Title</h2>
        <p>{item.name}</p>
        </div>

        <div className="price--title">
          <h2>Price</h2>
          <p>{item.price}</p>
        </div>

        <button 
          className="delete--btn"
          value={item.product_id}
          onClick={e => {
          const product_id = (e.target.value)
          handleDelete(product_id)
          }}
        >delete
        </button>

  </div>
))}
<div className="checkout--container">
<button 
className="checkout--btn"
onClick={() => handleOrder()}
>Check Out
</button>
</div>

</div> 
  )
}

export default Cart