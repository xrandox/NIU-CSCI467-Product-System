import { useState, useEffect } from "react";

import axios from "axios"
import OrderDetails from "../components/OrderDetails";
import authorization from "../components/Auth"

const Shipping = () => {
    const [orders, setOrders] = useState([]);
    const [err, setErr] = useState(null);

    const fetchOrders = async () => {
        try {
            setOrders(
                (await axios.get("/api/staff/orders/")).data
                    .filter(order => order.status !== "Shipped")
            );
        } catch (error) {
            setErr(error.toString());
        }
    }

    useEffect(() => {fetchOrders()}, []);

    const printFile = (rawHTML, fileName, fileType) => {
        // Creates a blob to download
        const url = window.URL.createObjectURL(new Blob([rawHTML], {type: fileType}));
        // Sets up, clicks, and removes link to download file
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        // Removes blob to avoid memory leak
        window.URL.revokeObjectURL(url);
    }

    const printPackingList = (order) => {
        var packingList = "<p>Packing list:</p>";
        for (let product of order.parts) {
            packingList += `<p><strong> Part ${product.partNumber}:</strong> ${product.quantity}</p>`;
        }

        printFile(packingList, "PackingList.html", "text/html");
    }

    const printInvoice = (order) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        var invoice = `<h1>Invoice</h1>
            <p><strong>To:</strong> ${order.shippingAddress.name}<br/>${order.shippingAddress.street}<br/>${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.zip}</p>
            <p><strong>Date:</strong> ${order.updatedAt.substring(0, order.updatedAt.indexOf('T'))}
            <p>Parts:</p><table><tr><th>Part Number</th><th>Quantity</th></tr>`;
        for (let product of order.parts) {
            invoice += `<tr><td>${product.partNumber}</td><td>${product.quantity}</td></tr>`
        }
        invoice += `</table><br/><table><tr><td>Subtotal:</td><td>${formatter.format(order.subtotal.$numberDecimal)}</td></tr><tr><td>Shipping:</td><td>${formatter.format(order.shippingAndHandling.$numberDecimal)}</td></tr><tr><td>Total:</td><td>${formatter.format(order.total.$numberDecimal)}</td></tr></table>`
        
        printFile(invoice, "Invoice.html", "text/html");
    }

    const printShippingLabel = (order) => {
        var shippingLabel = `<p><strong>To:</strong> ${order.shippingAddress.name}<br/>${order.shippingAddress.street}<br/>${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.zip}</p>
        <p><strong>USPS TRACKING #</strong><br/>XXXX XXXX XXXX XXXX XXXX XX</p>`

        printFile(shippingLabel, "ShippingLabel.html", "text/html");
    }

    const confirmShipment = async (order) => {
        try {
            await axios.patch("/api/staff/fulfill/" + order._id);
            await axios.patch("/api/staff/ship/" + order._id);
        } catch (error) {
            setErr(error.toString());
        }
        fetchOrders();
    }

    return (
        <div className="store">
            {err && <div className="error">{err}</div>}
            <div className="products">
                {orders && orders.map((order) => (
                    <div className="product-details">
                        <OrderDetails key={order._id} order={order} />
                        <br/>
                        <button onClick={() => printPackingList(order)}>Print packing list</button>
                        <button onClick={() => printInvoice(order)}>Print invoice</button>
                        <button onClick={() => printShippingLabel(order)}>Print shipping label</button>
                        <button onClick={() => confirmShipment(order)}>Confirm shipment</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default authorization(Shipping, ["admin", "employee"]);