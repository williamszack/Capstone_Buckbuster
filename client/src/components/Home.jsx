//all products will be displayed here
//child of App.js
import "../css/Home.css";
import React, { useEffect, useState } from "react";
import { getAllProducts, addProductToUsersCart } from "../api/home";
import Search from "./Search";
import Modal from "./Modal";


const Aside = () => {
  return (
    <div className="anchor--container">
      <a href="exampleLink.com">I dont</a>
      <a href="exampleLink.com">know</a>
      <a href="exampleLink.com">what to</a>
      <a href="exampleLink.com">put for</a>
      <a href="exampleLink.com">these links</a>
    </div>
  );
};

const Home = () => {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [productsToDisplay, setProductsToDisplay] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();
      console.log(data);
      setProducts(data);
    };
    fetchData();
  }, []);


  const handleAddToCart = async (product_id) => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      alert("You must be logged in to add an item to cart");
      return;
    }
    try {
      const response = await addProductToUsersCart(product_id, user_id);
      console.log(response);
      if (!response.error) {
        alert("movie added to your cart!");
      } else if (response.error) {
        alert("This movie already exists in your cart!");
      }
    } catch (error) {
      console.error(error);
    }


  useEffect(() => {
    const updatedProductsToDisplay =
      filteredData.length > 0 ? filteredData : products;
    setProductsToDisplay(updatedProductsToDisplay);
  }, [filteredData, products]);
  return (

    <div>
      <Search
        products={products}
        setProducts={setProducts}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
      ></Search>
      <h1 className="home--title">Listing all products</h1>
      <div className="home--container">
        <div className="aside--container">
          {" "}
          <Aside />{" "}
        </div>
        <div className="allProducts--container">
          {productsToDisplay.map((movie) => {
            return (
              <div className="product--container" key={movie.product_id}>
                <div className="movie--title">{movie.name}</div>
                <div>{movie.genre}</div>
                <img
                  className="product--image"
                  src={movie.image_url}
                  alt="movie"
                ></img>
                <div className="prices">
                  <div className="was--price">Was $1,000,000</div>
                  <div className="now--price">Now only ${movie.price}!!</div>
                </div>
                <div>{movie.quantity} Left in stock</div>
                <button
                  value={movie.product_id}
                  onClick={(e) => {
                    const product_id = e.target.value;
                    handleAddToCart(product_id);
                  }}
                  className="addToCart--button"
                >
                  Add to cart
                </button>
                <button onClick={() => setShow(true)}>More Details</button>
              </div>
            );
          })}
        </div>
        <Modal show={show} onClose={() => setShow(false)}>
          {" "}
        </Modal>

      </div>
    </div>
  );
};

export default Home;
