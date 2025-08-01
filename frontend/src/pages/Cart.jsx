import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title.jsx";
import { assets } from "../assets/assets.js";
import CartTotal from "../components/CartTotal.jsx";

const Cart = () => {
  const { navigate, products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="cart-screen-wrapper">
      <div>
        <Title text={"Your cart."} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div key={index} className="item-wrapper">
              <div className="cart-items">
                <img
                  className="cart-item-img"
                  src={productData.image[0]}
                  alt=""
                />
                <div className="cart-row-wrapper">
                  <p>{productData.name}</p>
                  <div className="cart-row">
                    <div className="price-size">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <button className="size-button">{item.size}</button>
                    </div>
                    <input
                      onChange={(e) =>
                        e.target.value === "" || e.target.value === "0"
                          ? null
                          : updateQuantity(
                              item._id,
                              item.size,
                              Number(e.target.value)
                            )
                      }
                      className="cart-qty-input"
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                    />
                    <img
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="cart-delete"
                      src={assets.bin_icon}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart-checkout-section">
        <CartTotal />
        <button
          onClick={() => navigate("/place-order")}
          className="checkout-button"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
