import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <div className="navbar">
      <img src="/verdelane.svg" alt="" />
      <button onClick={logout} className="nav-button">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
