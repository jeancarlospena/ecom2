import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";

const Sidebar = () => {
  return (
    <div className="side-navbar">
      <div>
        <NavLink className="side-nav-link" to="/add">
          <img src={assets.add_icon} alt="" />
          <span>Add Items</span>
        </NavLink>
      </div>
      <div>
        <NavLink className="side-nav-link" to="/list">
          <img src={assets.order_icon} alt="" />
          <span>List Items</span>
        </NavLink>
      </div>
      <div>
        <NavLink className="side-nav-link" to="/orders">
          <img src={assets.order_icon} alt="" />
          <span>Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
