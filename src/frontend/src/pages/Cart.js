import { useState, useEffect } from "react";
import { FaShoppingCart } from 'react-icons/fa';


import axios from "axios"
import authorization from "../components/Auth"

//TODO: Create a context(?)
const Cart = () => {
    const [products, setCart] = useState([]);

    const fetchCart = async () => {
        //TODO: Error handling
        setCart(
            (await axios.get("/api/cart/")).data.parts
        );
    }

    // user fills out order form, including shipping information
    const checkoutForm = () => {
      axios.post("/api/orders/", {
        "order": {
            "shippingAddress": {
                "name": "Mr Tester",
                "street": "45519 Mayert Forges",
                "city": "West Charley",
                "state": "IL",
                "zip": "12345",
                "country": "United States"
            }
        }
    })
      .then((response) => {
          console.log(response.data)
      })
      .catch((error) => {
          console.log(error)
      })
  }
      

    useEffect(() => { fetchCart() }, []);

    return (
        <div className="cart display">
            <h1>Cart <FaShoppingCart /></h1>
        <div className="productsList">
            <div className="products">
                {products && products.map((product) => (
                    <CartDetails key={product._id} product={product} />
                ))}
            </div> 
            <div className="order-form">
                <h1>Order Form</h1>
                <form onSubmit={checkoutForm}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />
                    <label htmlFor="street">Street</label>
                    <input type="text" id="street" name="street" required />
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" required />
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" name="state" required />
                    <label htmlFor="zip">Zip</label>
                    <input type="text" id="zip" name="zip" required />
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" name="country" required />
                    <button className="btn btn-primary">Submit</button>
                </form>
            <div className="order-summary">
                <h1>Order Summary</h1>
                <p><strong>Subtotal: </strong></p>
                <p><strong>Tax: </strong></p>
                <p><strong>Shipping: </strong></p>
                <p><strong>Total: </strong></p>
                <button className="btn btn-primary">Checkout</button>

            </div>
            </div>
        </div>
        </div>
    )
}

const CartDetails = ({ product }) => {

  const [partInfo, setPartInfo] = useState({})

  const fetchPartInfo = async ({ product }) => {
    try {
      setPartInfo(
        (await axios.get(`/api/parts/${product.partNumber}`)).data.part
      )
    } 
    catch (error) {
      console.log(error)
    }
  }

  const cartQuanityDecrement = ({ product }) => {
    axios.patch("/api/cart/", {
        "part": {
            "partNumber": product.partNumber,
            "quantity": product.quantity - 1
        }
    })
        .then((response) => {
        console.log(response.data)
        fetchPartInfo ({ product })
        // force page reload
        window.location.reload();
    })
    .catch((error) => {
        console.log(error)
        alert("At least one part must be in cart!")
    })
  }
  
  const cartQuanityIncrement = ({ product }) => {
    axios.patch("/api/cart/", {
        "part": {
            "partNumber": product.partNumber,
            "quantity": product.quantity + 1
        }
    })
        .then((response) => {
        console.log(response.data)
        fetchPartInfo ({ product })
        // force page reload
        window.location.reload();
    })
    .catch((error) => {
        console.log(error)
        alert("Not enough parts in stock!")
    })
  }

  useEffect(() => { 
    fetchPartInfo ({ product }) }, [ product ]);

    return (
        <div className="product-details">
          <strong>{partInfo.description}</strong>
          <div>
            <img src={partInfo.pictureURL} alt={partInfo.description} />
          </div>
          <div id="quantDisplay" style={{display : 'inline-block'}}>
            <p>
              <strong>Quantity: </strong>
              {product.quantity}
            </p>
          </div> 
          <p>
            <strong>Price: </strong>
            {partInfo.price}
          </p>
          <div id="quantAdjust" style={{display : 'inline-block'}}>
            <button onClick={() => {
              cartQuanityDecrement({ product })
            }}> - </button>
            <button onClick={() => {
              cartQuanityIncrement({ product })
            }}> + </button>
          </div>       
        </div>
      );
      }

export default authorization(Cart, ["user"]);