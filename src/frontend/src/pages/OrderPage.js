import { useState, useEffect } from "react";

import axios from "axios";
import authorization from "../components/Auth";
import OrderTable from "../components/OrderTable";

//TODO: Create a context(?)
const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    //TODO: Error handling
    setOrders((await axios.get("/api/staff/orders/")).data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <div>{orders && <OrderTable orders={orders} />}</div>
    </div>
  );
};

export default authorization(OrderPage, ["admin", "employee"]);
