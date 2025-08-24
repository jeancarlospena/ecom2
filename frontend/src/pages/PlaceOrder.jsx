import React from "react";
import Title from "../components/Title.jsx";
import CartTotal from "../components/CartTotal.jsx";
import { assets } from "../assets/assets.js";
import { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("stripe");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  // const [formData, setFormData] = useState({
  //   firstName: "Carlos",
  //   lastName: "Pena",
  //   email: "carlos@email.com",
  //   street: "111",
  //   city: "Hawthorne",
  //   state: "Texas",
  //   zipcode: "00001",
  //   country: "US",
  //   phone: "9734444444",
  // });
  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   street: "",
  //   city: "",
  //   state: "",
  //   zipcode: "",
  //   country: "",
  //   phone: "",
  // });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      toast.error("Failed to place order, try again later");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="place-order-wrapper">
      <div className="user-delivery-info">
        <Title text={"Delivery Information."} />
        <div className="delivery-info-wrapper">
          <div className="two-input-section">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              type="text"
              placeholder="First Name"
            />
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              type="text"
              placeholder="Last Name"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="delivery-spacer"
            type="email"
            placeholder="Email Address"
          />
          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="delivery-spacer "
            type="text"
            placeholder="Street"
          />
          <div className="delivery-spacer two-input-section">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              type="text"
              placeholder="City"
            />
            <input
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              type="text"
              placeholder="State"
            />
          </div>
          <div className="delivery-spacer two-input-section">
            <input
              required
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              type="text"
              placeholder="Zipcode"
            />
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="delivery-spacer"
            type="number"
            placeholder="Phone"
          />
        </div>
      </div>
      <div className="payment-section">
        <CartTotal />
        <div className="payment-methods">
          <p>Pay with</p>
          <img className="payment-img" src={assets.stripe_logo} alt="" />
        </div>
        <button className="checkout-button" type="submit">
          Place Order
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
