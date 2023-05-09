//Child of home.jsx

import React, { useState, useEffect } from "react";
import { getAllProducts } from "../api/home";
import "../css/Search.css";
const Search = (props) => {
  const [searchInput, setSearchInput] = useState("");
  // const [products, setProducts] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    const lowercaseSearchInput = searchInput.toLowerCase(); // Convert searchInput to lowercase
    const results = props.products.filter((product) => {
      if (product.name.toLowerCase().includes(lowercaseSearchInput)) {
        // Convert product name to lowercase
        console.log("Movie title:", product.name);
        return true;
      }
      return false;
    });
    props.setFilteredData(results);
    setSearchInput("");
  };

  const handleResetSearch = () => {
    setSearchInput(""); 
    props.setFilteredData(props.products);
  }

  return (
    <div className="searchbar--container">
      <input
        className="searchbar"
        type="text"
        placeholder="Search for movies by title"
        onChange={handleChange}
        value={searchInput}
      />

      <button className="searchbtn" onClick={handleSearch}>
        &#128269;
      </button>

      <button 
      className="allbtn"
      onClick={() => {
        setSearchInput('');
        handleResetSearch();
      }}>
        &#8634;
      </button>
    </div>
  );
};

export default Search;
