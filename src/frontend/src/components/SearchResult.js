import React from "react";
import axios from "axios";

import "./SearchResult.css"

export const SearchResult = ({ result }) => {

    // use axios to add to cart using POST request
    const addToCart = () => {
        axios.post("/api/cart/", {
            number: result.number,
            description: result.description,
            price: result.price,
            quantity: 1
        })
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return (
        <div 
            className="search-result"
            // click on result to add to cart, display success message
            onClick={() => {
                addToCart()
                alert("Part added to cart!")
            }}
        >
            { result.description }  ... Click to add to cart </div>
    );
}