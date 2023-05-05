import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const OrderTable = ({ orders }) => {
  const [sortType, setSortType] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [statusPen, setStatusPen] = useState(1);
  const [statusPack, setStatusPack] = useState(1);
  const [statusShip, setStatusShip] = useState(1);
  const [statusShipp, setStatusShipp] = useState(1);
  const [statusComp, setStatusComp] = useState(1);
  const [statusCanc, setStatusCanc] = useState(1);
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const createdAt = new Date(order.createdAt);
      const price = parseFloat(order.total.$numberDecimal);
      const status = order.status;

      if (minDate && createdAt < new Date(minDate)) {
        return false;
      }

      if (maxDate && createdAt > new Date(maxDate)) {
        return false;
      }

      if (minPrice && price < minPrice) {
        return false;
      }

      if (maxPrice && price > maxPrice) {
        return false;
      }

      if (
        (statusPen && status === "Pending") ||
        (statusPack && status === "Awaiting Packaging") ||
        (statusShip && status === "Awaiting Shipping") ||
        (statusShipp && status === "Shipped") ||
        (statusComp && status === "Complete") ||
        (statusCanc && status === "Cancel")
      ) {
        return true;
      }

      return false;
    });

    setFilteredOrders(filtered);
  }, [
    minPrice,
    maxPrice,
    minDate,
    maxDate,
    statusPen,
    statusPack,
    statusShip,
    statusShipp,
    statusComp,
    statusCanc,
    orders,
  ]);

  const sortOrders = (type) => {
    // flip direction if the same type is clicked
    let direction = "asc";
    if (sortType === type && sortDirection === "asc") {
      direction = "desc";
    }

    setSortType(type);
    setSortDirection(direction);
  };

  const statusToCode = (status) => {
    switch (status) {
      case "Pending":
        return 0;
      case "Awaiting Packaging":
        return 1;
      case "Awaiting Shipping":
        return 2;
      case "Shipped":
        return 3;
      case "Complete":
        return 4;
      default:
        return -1;
    }
  };

  let sortedOrders = [...filteredOrders];
  if (sortOrders !== null) {
    sortedOrders.sort((a, b) => {
      if (sortType === "createdAt") {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortType === "status") {
        const aStatusAsCode = statusToCode(a.status);
        const bStatusAsCode = statusToCode(b.status);
        return sortDirection === "asc"
          ? aStatusAsCode - bStatusAsCode
          : bStatusAsCode - aStatusAsCode;
      } else {
        const aPrice = a.total.$numberDecimal;
        const bPrice = b.total.$numberDecimal;
        return sortDirection === "asc" ? aPrice - bPrice : bPrice - aPrice;
      }
    });
  }

  return (
    <div>
      <form className="block center">
        <table>
          <thead>
            <tr>
              <th colspan="3">Filters</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h4 className="center">Date Limits</h4>
                <div className="block">
                  <label htmlFor="oldestDate">Oldest Date:</label>
                  <input
                    type="date"
                    id="oldestDate"
                    name="oldestDate"
                    value={minDate}
                    onChange={(e) => setMinDate(e.target.value)}
                  />
                  <input
                    type="date"
                    id="newestDate"
                    name="newestDate"
                    value={maxDate}
                    onChange={(e) => setMaxDate(e.target.value)}
                  />
                </div>
              </td>
              <td>
                <h4 className="center">Price Limits</h4>
                <div className="block">
                  <label htmlFor="priceMin">Price Min</label>
                  <input
                    type="number"
                    id="priceMin"
                    name="priceMin"
                    min="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <label htmlFor="priceMax">Price Max</label>
                  <input
                    type="number"
                    id="priceMax"
                    name="priceMax"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </td>
              <td>
                <h4 className="center">Status</h4>
                <div className="block">
                  <div>
                    <label htmlFor="pen">Pending</label>
                    <input
                      type="checkbox"
                      name="pen"
                      value="Pending"
                      checked={statusPen}
                      onChange={(e) => setStatusPen(!statusPen)}
                    />
                  </div>
                  <div>
                    <label htmlFor="awp">Awaiting Packaging</label>
                    <input
                      type="checkbox"
                      name="awp"
                      value="Awaiting Packaging"
                      checked={statusPack}
                      onChange={(e) => setStatusPack(!statusPack)}
                    />
                  </div>
                  <label htmlFor="aws">Awaiting Shipping</label>
                  <input
                    type="checkbox"
                    name="aws"
                    value="Awaiting Shipping"
                    checked={statusShip}
                    onChange={(e) => setStatusShip(!statusShip)}
                  />
                  <label htmlFor="shi">Shipped</label>
                  <input
                    type="checkbox"
                    name="shi"
                    value="Shipped"
                    checked={statusShipp}
                    onChange={(e) => setStatusShipp(!statusShipp)}
                  />
                  <label htmlFor="com">Complete</label>
                  <input
                    type="checkbox"
                    name="com"
                    value="Complete"
                    checked={statusComp}
                    onChange={(e) => setStatusComp(!statusComp)}
                  />
                  <label htmlFor="can">Cancelled</label>
                  <input
                    type="checkbox"
                    name="can"
                    value="Cancel"
                    checked={statusCanc}
                    onChange={(e) => setStatusCanc(!statusCanc)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div className="center">
        <table className="block">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>
                <button onClick={() => sortOrders("createdAt")}>
                  Created At
                </button>
              </th>
              <th>
                <button onClick={() => sortOrders("status")}>Status</button>
              </th>
              <th>
                <button onClick={() => sortOrders("total.$numberDecimal")}>
                  Total
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order._id}>
                <td>
                  <Link to={"/orderdetails/" + order._id}>{order._id}</Link>
                </td>
                <td>{order.customer}</td>
                <td>{order.createdAt}</td>
                <td>{order.status}</td>
                <td>{order.total.$numberDecimal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
