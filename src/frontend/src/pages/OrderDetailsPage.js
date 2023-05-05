import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import authorization from "../components/Auth";

const OrderDetailsPage = () => {
  const { orderID } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    let orderLink = "/api/staff/orders/" + orderID;

    console.log(orderLink);
    const fetchOrder = async () => {
      const response = await axios.get(orderLink);
      setOrder(response.data);
    };

    fetchOrder().catch(console.error);
  }, [orderID]);

  return (
    <div className="center">
      {order && (
        <div className="block">
          <h3 className="center">Order #{order._id}</h3>
          <p className="center">Customer: {order.customer}</p>
          <div className="block">
            <h4 className="center">Shipping Address</h4>
            <p>Name: {order.shippingAddress.name}</p>
            <p>Street: {order.shippingAddress.street}</p>
            <p>City: {order.shippingAddress.city}</p>
            <p>State: {order.shippingAddress.state}</p>
            <p>Zipcode: {order.shippingAddress.zip}</p>
            <p>Country: {order.shippingAddress.country}</p>
          </div>
          <div className="block">
            <h4 className="center">Info</h4>
            <p>Status: {order.status}</p>
            <p>Subtotal: {order.subtotal.$numberDecimal}</p>
            <p>Weight: {order.weight.$numberDecimal}</p>
            <p>Total: {order.total.$numberDecimal}</p>
          </div>
          <div className="block">
            <h4 className="center">Timestamps</h4>
            <p>Created At: {order.createdAt}</p>
            <p>Last Updated: {order.updatedAt}</p>
            <p>Shipped At: {order.shippedTimestamp}</p>
          </div>
          <div className="block">
            <h4 className="center">Parts</h4>
            {order.parts.map((part) => (
              <div key={part.partNumber}>
                <p>Part Number: {part.partNumber}</p>
                <p>Quantity: {part.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default authorization(OrderDetailsPage, ["admin", "employee"]);
