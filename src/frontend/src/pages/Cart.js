import { useState, useEffect } from "react";

import axios from "axios"
/* import authorization from "../components/Auth" */

import Basket from "../components/Basket";

//TODO: Create a context(?)
const Cart = () => {
    const [product, setCart] = useState([]);

    const fetchCart = async () => {
        //TODO: Error handling
        setCart(
            (await axios.get("/api/cart/")).data
        );
    }

    useEffect(() => {fetchCart()});

    return (
        //TODO: Don't reuse class names(?)
        <div className="productsList">
            <div className="products">
                {product && product.map((product) => (
                    <CartDetails key={product._id} product={product} />
                ))}
                <div>
                    <Basket />
                </div>
            </div>
        </div>
    )
}

const CartDetails = ({ product }) => {

    return (
        <div className="product-details">
          <strong>{product.description}</strong>
          <div>
            <img src={product.pictureURL} alt={product.name} />
          </div>
          <p>
            <strong>Price: </strong>
            {product.price}
          </p>
          <p>
            Working??????
          </p>
          <p>
            <strong>Quantity Available: </strong>
            {product.quantity}
          </p>
        </div>
      );
      }

/* export default authorization(Cart, "user"); */
export default Cart;

/* import React from "react";

const Cart = () => {

    return (
        <div className="home">
            <h1>Welcome to Worldwide Automotive Parts! </h1>
            <p>Users please navigate to the login at the top of the page for the best shopping experience!</p>
            <p>Once logged in, please navigate to the store to browse our products!</p>
        </div>

    )
}

export default Cart */