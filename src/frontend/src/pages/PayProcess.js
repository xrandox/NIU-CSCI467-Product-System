// payment process page
import React, { useState } from "react";
import axios from "axios";
import authorization from "../components/Auth";
import { useNavigate, useParams } from "react-router-dom";

export const PayProcess = () => {
  const nav = useNavigate();
  const { orderID } = useParams();

  const [cc, setcc] = useState(null);

  const [name, setname] = useState(null);

  const [exp, setexp] = useState(null);

  const submitPayment = () => {
    axios
      .post("/api/credit/", {
        data: {
          orderID: orderID,
          cc: cc,
          name: name,
          exp: exp,
        },
      })
      .then((response) => {
        console.log(response.data);
        nav("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>Payment Process</h1>
      <label htmlFor="cc">Credit Card Number</label>
      <input
        id="cc"
        name="Credit Card"
        value={cc}
        onChange={(e) => setcc(e.target.value)}
      />
      <label htmlFor="name">Name on Card</label>
      <input
        id="name"
        name="Name"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <label htmlFor="exp">Expiration</label>
      <input
        id="exp"
        name="Expiration Date"
        value={exp}
        onChange={(e) => setexp(e.target.value)}
      />
      <button
        onClick={() => {
          submitPayment();
          alert("Payment submitted!");
        }}
      >
        Submit Payment
      </button>
    </div>
  );
};

export default authorization(PayProcess, ["user"]);
