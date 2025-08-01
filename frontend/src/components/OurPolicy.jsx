import React from "react";
import { assets } from "../assets/assets.js";

const OurPolicy = () => {
  return (
    <div className="policy-section">
      <div className="policy-bullet">
        <img src={assets.exchange_icon} alt="" />
        <p className="bullet-heading">Easy exchange policy</p>
        <p>We offer hassle free exchange policy</p>
      </div>
      <div className="policy-bullet">
        <img src={assets.quality_icon} alt="" />
        <p className="bullet-heading">7 Days return policy</p>
        <p>We profide 7 days free return policy</p>
      </div>
      <div className="policy-bullet">
        <img src={assets.support_img} alt="" />
        <p className="bullet-heading">Best customer support</p>
        <p>We prodive 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
