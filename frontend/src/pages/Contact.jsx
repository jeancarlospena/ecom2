import React from "react";
import Title from "../components/Title.jsx";
import { assets } from "../assets/assets.js";
import NewsLetter from "../components/NewsLetter.jsx";

const Contact = () => {
  return (
    <div>
      <div>
        <h2 className="page-title">Contact Us</h2>
      </div>
      <div className="contact-us-info">
        <img src={assets.contact_img} alt="" />
        <div className="contact-us-details">
          <p className="contact-title">Our Store</p>
          <p>
            54709 Willms Stations <br /> Suite 350, Washington, Usa
          </p>
          <p>
            Tel: +1 (999) 999-999 <br />
            Email: adming@forever.com
          </p>
          <p className="contact-title">Careers at Forever</p>
          <p>Learn more about our teams and job openings.</p>
          <button>Explore Jobs</button>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default Contact;
