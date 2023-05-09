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

  return (
    <div>
      <input
        type="text"
        placeholder="Search for movies here"
        onChange={handleChange}
        value={searchInput}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
