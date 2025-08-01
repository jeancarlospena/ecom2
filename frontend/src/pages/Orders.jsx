import React, { useContext } from "react";
import Title from "../components/Title.jsx";
import { ShopContext } from "../context/ShopContext.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      } else {
        const response = await axios.post(
          backendUrl + "/api/order/userorders",
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          let allOrdersItems = [];
          response.data.orders.map((order) => {
            order.items.map((item) => {
              item["status"] = order.status;
              item["payment"] = order.payment;
              item["paymentMethod"] = order.paymentMethod;
              item["date"] = order.date;
              allOrdersItems.push(item);
            });
          });

          setOrderData(allOrdersItems.reverse());
        }
      }
    } catch (error) {
      toast.error("Unable to get orders");
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div>
      <Title text={"Your orders."} />
      <div>
        {orderData.map((item, index) => (
          <div className="user-order" key={index}>
            <img className="order-img" src={item.image[0]} alt="" />
            <div className="order-info">
              <p>{item.name}</p>
              <div className="order-info-price-qty">
                <p>
                  {currency}
                  {item.price}
                </p>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
              </div>
              <p>
                Date: <span>{new Date(item.date).toDateString()}</span>
              </p>
              <p>
                Payment: <span>{item.paymentMethod}</span>
              </p>
            </div>
            <div className="order-status-indicator">
              <p className="status-indicator-circle"></p>
              <p>{item.status}</p>
            </div>
            <button onClick={loadOrderData} className="order-track-button">
              Track order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
