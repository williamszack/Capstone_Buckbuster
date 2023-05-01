//all products will be displayed here
//child of App.js
import '../css/Home.css'
import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../api/home'

const Aside = () => {
  return (
    <div className='anchor--container'>
    <a href='exampleLink.com'>I dont</a>
    <a href='exampleLink.com'>know</a>
    <a href='exampleLink.com'>what to</a>
    <a href='exampleLink.com'>put for</a>
    <a href='exampleLink.com'>these links</a>
    </div>
  )
}


const Home = () => {

const [products, setProducts] = useState ([])

useEffect(() => {
  const fetchData = async () => {
    const data = await getAllProducts()
    console.log(data)
    setProducts(data)
  }
  fetchData()
},[])


  return (
  <div>
    <h1 className='home--title'>Listing all products</h1>
    <div className='home--container'>
      <div className='aside--container'> <Aside /> </div>
        <div className='allProducts--container'>
        
          {products.map(movie => {
            return (
              <div className='product--container'>
              <div className='movie--title'>{movie.name}</div>
              <div>{movie.genre}</div>
              <img className='product--image' src={movie.image_url} alt="movie"></img>
                <div className='prices'>
                  <div className='was--price'>Was $1,000,000</div>
                  <div className='now--price'>Now only ${movie.price}!!</div>
                </div>
             <div>{movie.quantity} Left in stock</div>   
               <button 
                onClick={() => alert('Virus installing...')}
                className='addToCart--button'>Add to cart
                </button>    
              </div> 
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
