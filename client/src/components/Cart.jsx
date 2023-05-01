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
        <img className='image' src={item.image_url}></img>

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

// cartItems =

// [

//   item = { 
//     id: 2
//     name: "The godfather",
//     price: "12.99" 
//   },

//   item = {
//     id: 3
//     name: "Batman",
//     price: "9.99"
//   }

// ]

export default Cart

{/* <div>
<h2>Your Cart</h2>
 {cartItems.map((item) => ( */}
//      <div key={item.id}>
//        <p>{item.name}</p>
//        <p>{item.price}</p>
//      </div>
//    ))}
//  </div>


// function Cart() {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     // API call to fetch cart by user_id
//     fetch(`https://example.com/api/cart/${user_id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setCartItems(data.items);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [user_id]);

  // return (
  //   <div>
  //     <h2>Your Cart</h2>
  //     {cartItems.map((item) => (
  //       <div key={item.id}>
  //         <p>{item.name}</p>
  //         <p>{item.price}</p>
  //       </div>
  //     ))}
  //   </div>
  // );
// }


