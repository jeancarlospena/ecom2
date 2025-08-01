import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <div className="navbar">
      <img className="header-logo" src={"/verdelane.svg"} alt="" />
      <ul className="nav-links">
        <div className="header-link">
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="header-link">
          <NavLink to="/collection">Collection</NavLink>
        </div>
        <div className="header-link">
          <NavLink to="/about">About</NavLink>
        </div>
        <div className="header-link">
          <NavLink to="/contact">Contact</NavLink>
        </div>
      </ul>

      <div className="navbar-end">
        <img
          onClick={() => setShowSearch(true)}
          className="nav-icon"
          src={assets.search_icon}
          alt=""
        />
        <div className="nav-dropdown">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="nav-icon"
            src={assets.profile_icon}
            alt=""
          />
          {/* drop down menu */}
          {token && (
            <div className="dropdown-items">
              <p>My Profile</p>
              <p onClick={() => navigate("/orders")}>Orders</p>
              <p onClick={logout}>Logout</p>{" "}
            </div>
          )}
        </div>
        <Link className="cart-wrapper" to={"/cart"}>
          <img className="nav-icon" src={assets.cart_icon} alt="" />
          <p className="cart-count">{getCartCount()}</p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className=" menu-icon"
          alt=""
        />
      </div>
      {/* sidebar menu for small screens */}
      <div className={`small-screen-nav ${visible ? "open-menu" : ""}`}>
        {/* <div className={`small-screen-nav width-full`}> */}
        <div
          className={`nav-close-btn ${visible ? "nav-close-btn-padding" : ""}`}
          onClick={() => setVisible(false)}
        >
          <img className="arrow-back-btn" src={assets.dropdown_icon} alt="" />
          <p className="header-link">back</p>
        </div>
        <div
          className={`small-screen-nav-links nav-close-btn ${
            visible ? "nav-close-btn-padding" : ""
          }`}
        >
          <NavLink onClick={() => setVisible(false)} to="/">
            Home
          </NavLink>
          <NavLink onClick={() => setVisible(false)} to="/collection">
            Collection
          </NavLink>
          <NavLink onClick={() => setVisible(false)} to="/about">
            About
          </NavLink>
          <NavLink onClick={() => setVisible(false)} to="/contact">
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
