import React, { useState } from 'react'
import axios from "axios";
import { FaSearch } from 'react-icons/fa';
import "./SearchBar.css"

export const SearchBar = ({ setResults }) => {

  const [searchTerm, setSearchTerm] = useState('')

  const fetchProducts = (value) => {
      axios.get(`/api/parts/?search=${value}`)
      .then((response) => {
          console.log(response.data)
          const results = response.data.filter((product) => {
              return value && product && product.description.toLowerCase().includes(value.toLowerCase())
          });
          setResults(results);
      })
      .catch((error) => {
          console.log(error)
      })
  }

  const handleSearch = (value) => {
      setSearchTerm(value)
      fetchProducts(value)
  }


   return (
      <div className="input-wrapper">
          <FaSearch id="search-icon" />
          <input placeholder='Search for a part' value={searchTerm} onChange={(e) => handleSearch(e.target.value)}/>
      </div>
  );
};