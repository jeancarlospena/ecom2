import React from "react";

const SectionIntro = ({ message }) => {
  return (
    <div className="section-intro">
      <h2>{message}</h2>
      <button>shop now</button>
    </div>
  );
};

export default SectionIntro;
