/**
 * This file contains the code for the store product component that is shown on store pages
 */

const ProductDetails = ({ product }) => {
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
    </div>
  );
};

export default ProductDetails;
