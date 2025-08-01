import { React, useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App.jsx";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    console.log("hit");
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="active-section-container">
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div className="complete-order" key={index}>
            <img src={assets.parcel_icon} />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p
                        key={index}
                        className={index > 0 ? "order-spacer-top" : ""}
                      >
                        {item.name} x {item.quantity}
                        <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p
                        key={index}
                        className={index > 0 ? "order-spacer-top" : ""}
                      >
                        {item.name} x {item.quantity}
                        <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="order-spacer-2 bold">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ","} </p>
                <p className="order-spacer-top">
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}{" "}
                </p>
              </div>
              <p className="order-spacer-top">{order.address.phone}</p>
            </div>
            <div>
              <p className="order-spacer-main">Items: {order.items.length}</p>
              <p className="order-spacer-top">Method: {order.paymentMethod}</p>
              <p className="order-spacer-top">
                Payment: {order.payment ? "Done" : "Pending"}
              </p>
              <p className="order-spacer-top">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <p>
              {currency}
              {order.amount}
            </p>
            <select
              className="dropdown-status"
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Order placed">Order placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
