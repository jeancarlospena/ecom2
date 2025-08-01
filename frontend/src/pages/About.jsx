import React from "react";
import Title from "../components/Title.jsx";
import { assets } from "../assets/assets.js";
import NewsLetter from "../components/NewsLetter.jsx";

const About = () => {
  return (
    <div>
      <div>
        <Title text={"About us."} />
      </div>
      <div className="about-us-main">
        <img src={assets.about_img} alt="" />
        <div className="about-us-main-text">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis,
            placeat? Id officia quibusdam magni sed cupiditate voluptatum quae
            praesentium non eveniet iure consequuntur recusandae iusto et ipsum,
            quo pariatur ipsam! Lorem, ipsum dolor sit amet consectetur
            adipisicing elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consectetur, eum suscipit. Delectus repellendus deleniti fugiat,
            distinctio, nostrum quaerat explicabo odit non quos porro nihil eius
            ipsam voluptate maxime ut eligendi.
          </p>
          <p className="mission-bold">Our mission</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut nobis
            excepturi porro quos dolores? Deserunt aliquam velit sunt vel
            accusantium omnis voluptates ipsum? Animi illo dolor deserunt
            assumenda. Deserunt aliquam velit sunt vel accusantium omnis
            voluptates ipsum? Animi illo dolor deserunt assumenda. Debitis,
            deleniti!
          </p>
        </div>
        <div></div>
      </div>
      <Title text={"Why choose us?"} />
      <div className="choose-us-section">
        <div>
          <p className="choose-heading">Quality Assurance:</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore
            odit porro animi libero culpa consequuntur aperiam. Repudiandae
            quaerat nisi incidunt voluptates, odit rerum deleniti, labore nobis
            dolorem officia enim molestiae.
          </p>
        </div>
        <div>
          <p className="choose-heading">Convenience:</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore
            odit porro animi libero culpa consequuntur aperiam. Repudiandae
            quaerat nisi incidunt voluptates, odit rerum deleniti, labore nobis
            dolorem officia enim molestiae.
          </p>
        </div>
        <div>
          <p className="choose-heading">Exceptional Customer Service:</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore
            odit porro animi libero culpa consequuntur aperiam. Repudiandae
            quaerat nisi incidunt voluptates, odit rerum deleniti, labore nobis
            dolorem officia enim molestiae.
          </p>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default About;
