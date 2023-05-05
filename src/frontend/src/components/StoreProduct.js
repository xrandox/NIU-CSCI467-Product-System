/**
 * This file contains the code for the store product component that is shown on store pages
 */

import axios from "axios";

const ProductDetails = ({ product }) => {

  const addToCart = () => {
    axios.post("/api/cart/", {
      "part": {
        "partNumber": product.number,
        "quantity": 1
      }  
    })
        .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
  }

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
        {product.quantity}
      </p>
      <button onClick={() => {
                addToCart()
                alert("Part added to cart!")          
            }}
      >Add 1 to cart
      </button>
    </div>
  );
};

export default ProductDetails;
