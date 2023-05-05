const OrderDetails = ({ order }) => {
    return (
        <div className="product-details">
            <h4>{order.shippingAddress.name}</h4>
            <p><strong>Date: </strong>{order.createdAt.substring(0, order.updatedAt.indexOf('T'))}</p>
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