import { useState, useEffect } from "react";

import axios from "axios"
import authorization from "../components/Auth"

//TODO: Create a context(?)
const Shipping = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        //TODO: Error handling
        setOrders(
            (await axios.get("/api/staff/orders/")).data
               .filter(order => order.status !== "Shipped")
        );
    }

    useEffect(() => {fetchOrders()}, []);

    return (
        //TODO: Don't reuse class names(?)
        <div className="store">
            <div className="products">
                {orders && orders.map((order) => (
                    <OrderDetails key={order._id} order={order} />
                ))}
            </div>
        </div>
    )
}

//TODO: Move to separate file(?)
const OrderDetails = ({order}) => {

    const confirmShipment = async () => {
        //TODO: Error handling
        await axios.patch("/api/staff/fulfill/" + order._id);
    }

    return (
        //TODO: Don't reuse class names(?)
        //TODO: Make the buttons work
        <div className="product-details">
            <h4>{order.shippingAddress.name}</h4>
            <p><strong>Price: </strong>{order.total.$numberDecimal}</p>
            <br/>
            <div className="products">
                {order.parts &&
                order.parts.map((product) => (
                    <p>{product.quantity} of part number {product.partNumber}</p>
                ))}
            </div>
            <br/>
            <button>Print packing list</button>
            <button>Print invoice</button>
            <button>Print shipping label</button>
            <button onClick={confirmShipment}>Confirm shipment</button>
        </div>
    )
}

export default authorization(Shipping, ["admin", "employee"]);