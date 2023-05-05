/**
 * This file contains the code for the store product component that is shown on store pages
 */

import axios from "axios";
import { useState } from "react";

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    axios
      .post("/api/cart/", {
        part: {
          partNumber: product.number,
          quantity: quantity,
        },
      })
      .then((response) => {
        alert("Added " + quantity + " of " + product.description + " to cart!");
        window.location.reload();
        console.log(response.data);
      })
      .catch((error) => {
        alert(
          "Not enough of this part to add the requested amount to your cart"
        );
        console.log(error);
      });
  };

  return (
    <div className="product-details">
      <h4>{product.description}</h4>
      <div>
        <img src={product.pictureURL} alt={product.name} />
      </div>
      <p>
        <strong>Price: </strong>
        {product.price}
      </p>
      <p>
        <strong>Quantity Available: </strong>
        {product.quantityAvailable}
      </p>
      <label htmlFor="numToAdd">Quantity:</label>
      <input
        type="number"
        id="numToAdd"
        name="numToAdd"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button
        onClick={() => {
          addToCart();
        }}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductDetails;
