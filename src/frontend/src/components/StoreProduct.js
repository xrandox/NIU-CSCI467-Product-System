/**
 * This file contains the code for the store product component that is shown on store pages
 */

const ProductDetails = ({ product }) => {
  return (
    <div className="product-details">
      <h4>{product.name}</h4>
      <p>
        <strong>Available: </strong>
        {product.quantity}
      </p>
    </div>
  );
};

export default ProductDetails;
