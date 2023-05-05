import { useState, useEffect } from "react";

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

    useEffect(() => { fetchCart() }, []);

    return (
        //TODO: Don't reuse class names(?)
        <div className="productsList">
            <div className="products">
                {products && products.map((product) => (
                    <CartDetails key={product._id} product={product} />
                ))}
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