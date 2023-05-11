//Child of home.jsx

import React, { useState, useEffect } from "react";
import { getAllProducts } from "../api/home";
import "../css/Search.css";
const Search = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('');
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


  const filterProductsByCategory = () => {
    if (selectedCategory === '') {
      props.setFilteredData(props.products);
    } else {
      const results = props.products.filter((product) => product.genre === selectedCategory);
      props.setFilteredData(results);
    }
  };

  const uniqueGenres = [...new Set(props.products.map((product) => product.genre))];
  const optionSelect = uniqueGenres.sort((a, b) => a.localeCompare(b)).map((genre) => (
    <option key={genre} value={genre}>{genre}</option>
  ));


  useEffect(() => {
    filterProductsByCategory();
  }, [selectedCategory]);

  const handleResetSearch = () => {
    setSelectedCategory("")
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

      <select
      className="category"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      >
      <option disabled>Sort by Genre</option>
      <option value="">All movies</option>
      {optionSelect}
      {/*}
      <option value="Action">Action</option>
      <option value="Crime">Crime</option>
      <option value="Drama">Drama</option>
      <option value="Thriller">Thriller</option>
      <option value="Fantasy">Fantasy</option>
      <option value="Science Fiction">Science Fiction</option>
      <option value="Animation">Animation</option>
      <option value="Romance">Romance</option>
      <option value="Documentary">Documentary</option>
      <option value="Horror">Horror</option> */}
      </select>

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
