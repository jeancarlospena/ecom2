import React from "react";
import { assets } from "../assets/assets.js";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top-footer">
        <div className="left-section-footer">
          <img className="header-logo" src="/verdelane.svg" alt="" />
          <p className="footer-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi,
            molestias magni deleniti nam totam perferendis optio rem odio ad.
            Officia, quaerat! Placeat quia facilis aperiam unde, sit quasi
            accusantium cum!
          </p>
        </div>

        <div className="right-section-footer">
          <div>
            <p>Company</p>
            <ul className="footer-list">
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div>
            <p>Get in touch</p>
            <ul className="footer-list">
              <li>+1-999-999-9999</li>
              <li>support@verdelande.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copy-right-section">
        <hr />
        <p className="copy-message">
          Copyright 2025@ verdelane.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
