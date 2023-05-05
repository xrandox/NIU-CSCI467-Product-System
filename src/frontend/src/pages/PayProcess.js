// payment process page
import React from "react";
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
        <div 
            className="search-result"
            // click on result to add to cart, display success message
            onClick={() => {
                addToCart()
                alert("Part added to cart!")
            }}
        >
                <input
                    type="date"
                    id="oldestDate"
                    name="oldestDate"
                    value={minDate}
                    onChange={(e) => setMinDate(e.target.value)}
                  />
            { result.description }  ... Click to add to cart </div>
    );
}





