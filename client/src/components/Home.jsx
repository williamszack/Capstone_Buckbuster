//all products will be displayed here
//child of App.js
import "../css/Home.css";
import React, { useEffect, useState } from "react";
import { getAllProducts, addProductToUsersCart } from "../api/home";
import Search from "./Search";
import Modal from "./Modal";
import useNotification from './ui/useNotification';

const Home = () => {


  const { toastNotify } = useNotification();

  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [product_id, setProduct_id] = useState();

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
      toastNotify("You must be logged in to add an item to cart", "error");
      return;
    }
    try {
      const response = await addProductToUsersCart(product_id, user_id);
      console.log(response);
      if (!response.error) {
        toastNotify("movie added to your cart!", "success");
      } else if (response.error) {
        toastNotify("This movie already exists in your cart!",  "warning");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const updatedProductsToDisplay =
      filteredData.length > 0 ? filteredData : products;
    setProductsToDisplay(updatedProductsToDisplay);
  }, [filteredData, products]);
  return (
    <div>
      <div className="search-title--container">
        <h1 className="home--title">Buckbuster Movies</h1>
        <Search
          products={products}
          setProducts={setProducts}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        ></Search>
      </div>
      <div className="home--container">
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
                <button
                  value={movie.product_id}
                  onClick={(e) => {
                    const product_id = e.target.value;
                    setProduct_id(product_id);
                    setShow(true);
                  }}
                >
                  More Details
                </button>
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
              </div>
            );
          })}
        </div>
        <Modal
          product_id={product_id}
          show={show}
          onClose={() => setShow(false)}
        >
          {" "}
        </Modal>
      </div>
    </div>
  );
};

export default Home;
