// payment process page
import React, { useState } from "react";
import axios from "axios";

import { Cart } from "../components/Cart";

export const PayProcess = () => {

    const [orderID, setorderID] = useState(null);
    const [cc, setcc] = useState(null);
    const [name, setname] = useState(null);
    const [exp, setexp] = useState(null);

    const addToCart = () => {
        axios.post("/api/cart/", 
            {
                "data": {
                    "orderID": "{{newOrderID}}",
                    "cc": "6011 1234 4321 1234",
                    "name": "John Doe",
                    "exp": "12/2025"
                }
            }
        )
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <h1>Payment Process</h1>
                <input
                    id="orderID"
                    name="Order ID"
                    value={orderID}
                    onChange={(e) => setorderID(e.target.value)}
                />
                <input
                    id="cc"
                    name="Credit Card"
                    value={cc}
                    onChange={(e) => setcc(e.target.value)}
                />
                <input
                    id="name"
                    name="Name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                />
                <input
                    id="exp"
                    name="Expiration Date"
                    value={exp}
                    onChange={(e) => setexp(e.target.value)}
                />
        </div>
    );
}