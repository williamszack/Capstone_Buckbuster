//all products will be displayed here
//child of App.js
import '../css/Home.css'
import React, { useEffect, useState } from 'react'
import { getAllProducts, addProductToUsersCart} from '../api/home'
import Modal from './Modal'

const Home = () => {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState ([])
  const [product_id, setProduct_id] = useState()

useEffect(() => {
  const fetchData = async () => {
    const data = await getAllProducts()
    setProducts(data)
  }
  fetchData()
},[])

const handleAddToCart = async (product_id) => {
const user_id = localStorage.getItem("user_id")
  if (!user_id) {
    alert ("You must be logged in to add an item to cart")
    return;
  }
  try {
    const response = await addProductToUsersCart(product_id, user_id)
    console.log(response)
    if (!response.error) {
      alert("movie added to your cart!")
    } else if (response.error) {
      alert("This movie already exists in your cart!")
    }
  } catch (error) {
    console.error(error)
  }
}

  return (
  <div>
    <div className='search-title--container'>
      <h1 className='home--title'>Buckbuster Movies</h1>
        <span className='searchbar--container'>
        <input className='searchbar' placeholder='Search for movie by title'></input>
        <button type="submit" className='searchbtn'>&#128269;</button>
        </span>
      </div>
    <div className='home--container'>
        <div className='allProducts--container'>
        
          {products.map(movie => {
            return (
              <div className='product--container' key={movie.product_id}>
              <div className='movie--title'>{movie.name}</div>
              <div>{movie.genre}</div>
              <img className='product--image' src={movie.image_url} alt="movie"></img>
                <div className='prices'>
                  <div className='was--price'>Was $1,000,000</div>
                  <div className='now--price'>Now only ${movie.price}!!</div>
                </div>
             <div>{movie.quantity} Left in stock</div>   

               <button 
                value={movie.product_id}
                onClick={e => {
                  const product_id = (e.target.value)
                  handleAddToCart(product_id)
                }}
                className='addToCart--button'>Add to cart
                </button> 

                <button 
                value={movie.product_id}
                onClick={(e) => {
                  const product_id = (e.target.value)
                  setProduct_id(product_id)
                  setShow(true)
                }}
                >More Details
                </button>

              </div> 
            )
          })}
        </div>
        <Modal product_id={product_id} show={show} onClose={() => setShow(false)}>
        {" "}
      </Modal> 
      </div>
    </div>
  )
}

export default Home
