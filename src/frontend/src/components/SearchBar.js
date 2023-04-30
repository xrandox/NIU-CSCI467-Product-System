import React from 'react'
/* import StoreProduct from "../components/StoreProduct";
import axios from "axios"; */
import { FaSearch } from 'react-icons/fa';

export const searchBar = () => {

   return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input placeholder='Search for a part'/>
    </div>
  );
};