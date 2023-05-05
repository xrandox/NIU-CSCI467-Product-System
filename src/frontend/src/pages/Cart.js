import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

import axios from "axios";
import authorization from "../components/Auth";

//TODO: Create a context(?)
const Cart = () => {
  const [products, setCart] = useState([]);
  const [name, setName] = useState(null);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zip, setZip] = useState(null);
  const [country, setCountry] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const submitOrder = async (e) => {
    e.preventDefault();
    const resp = await axios.post("/api/orders/", {
      order: {
        shippingAddress: {
          name: name,
          street: street,
          city: city,
          state: state,
          zip: zip,
          country: country,
        },
      },
    });

    if (resp.status === 200) {
      setOrderData(resp.data);
    }
  };

  const fetchCart = async () => {
    //TODO: Error handling
    setCart((await axios.get("/api/cart/")).data.parts);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart display block expand">
      <h1>
        Cart <FaShoppingCart />
      </h1>
      <div className="productsList">
        <div className="products">
          {products &&
            products.map((product) => (
              <CartDetails key={product._id} product={product} />
            ))}
        </div>
        {!orderData && (
          <div className="order-form">
            <h1>Shipping Information</h1>
            <form>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <label htmlFor="zip">Zip</label>
              <input
                type="text"
                id="zip"
                name="zip"
                required
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <button className="btn btn-primary" onClick={submitOrder}>
                Submit
              </button>
            </form>
          </div>
        )}

        {orderData && (
          <div className="order-summary">
            <h1>Order Summary</h1>
            <p>
              <strong>Subtotal: </strong>
              {orderData.order.subtotal.$numberDecimal}
            </p>
            <p>
              <strong>Shipping: </strong>
              {orderData.order.shippingAndHandling.$numberDecimal}
            </p>
            <p>
              <strong>Total: </strong>
              {orderData.order.total.$numberDecimal}
            </p>
            <Link to={"/payment/" + orderData.order._id}>
              <button className="btn btn-primary">Proceed to Payment</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const CartDetails = ({ product }) => {
  const [partInfo, setPartInfo] = useState({});

  const fetchPartInfo = async ({ product }) => {
    try {
      setPartInfo(
        (await axios.get(`/api/parts/${product.partNumber}`)).data.part
      );
    } catch (error) {
      console.log(error);
    }
  };

  const cartQuanityDecrement = ({ product }) => {
    axios
      .patch("/api/cart/", {
        part: {
          partNumber: product.partNumber,
          quantity: product.quantity - 1,
        },
      })
      .then((response) => {
        console.log(response.data);
        fetchPartInfo({ product });
        // force page reload
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("At least one part must be in cart!");
      });
  };

  const cartQuanityIncrement = ({ product }) => {
    axios
      .patch("/api/cart/", {
        part: {
          partNumber: product.partNumber,
          quantity: product.quantity + 1,
        },
      })
      .then((response) => {
        console.log(response.data);
        fetchPartInfo({ product });
        // force page reload
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("Not enough parts in stock!");
      });
  };

  useEffect(() => {
    fetchPartInfo({ product });
  }, [product]);

  return (
    <div className="product-details">
      <strong>{partInfo.description}</strong>
      <div>
        <img src={partInfo.pictureURL} alt={partInfo.description} />
      </div>
      <div id="quantDisplay" style={{ display: "inline-block" }}>
        <p>
          <strong>Quantity: </strong>
          {product.quantity}
        </p>
      </div>
      <p>
        <strong>Price: </strong>
        {partInfo.price}
      </p>
      <div id="quantAdjust" style={{ display: "inline-block" }}>
        <button
          onClick={() => {
            cartQuanityDecrement({ product });
          }}
        >
          {" "}
          -{" "}
        </button>
        <button
          onClick={() => {
            cartQuanityIncrement({ product });
          }}
        >
          {" "}
          +{" "}
        </button>
      </div>
    </div>
  );
};

export default authorization(Cart, ["user"]);
