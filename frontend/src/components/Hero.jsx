import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="top-hero">
      <Link to={"/collection"}>
        <div className="main-hero">
          <img className="hero-img" src="/heroimg.png" alt="hero" />
          <div className="hero-intro">
            <h3 className="hero-message">THE GETAWAY GUIDE</h3>
            <p>Effortless & affordable upgrade for your everyday wardrobe.</p>
            <span className="hero-btn">SHOP NOW</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Hero;
