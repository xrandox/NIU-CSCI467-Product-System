const OrderDetails = ({ order }) => {
  //TODO: Context(?)
  return (
      //TODO: Don't reuse class names(?)
      <div className="product-details">
          <h4>{order.shippingAddress.name}</h4>
          <p><strong>Date: </strong>{order.createdAt}</p>
          <p><strong>Status: </strong>{order.status}</p>
          <p><strong>Price: </strong>{order.total.$numberDecimal}</p>
          <br/>
          <div className="products">
              {order.parts &&
              order.parts.map((product) => (
                  <p><strong>Product {product.partNumber}:</strong> {product.quantity}</p>
              ))}
          </div>
      </div>
  )
}

export default OrderDetails;