import React from "react";

const NewsLetter = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="news-letter-section">
      <p className="news-promo">Subscibe now & get 20% off</p>
      <p className="news-message">
        Magnam expedita perspiciatis repellendus neque? Quia, eaque! Iure
        necessitatibus, commodi itaque totam atque sequi, exercitationem eum
        quam hic delectus eligendi quo earum!
      </p>
      <form onSubmit={onSubmitHandler} className="news-form" action="">
        {" "}
        <input
          type="text"
          placeholder="Enter your email"
          name=""
          id=""
          required
          className="news-input"
        />
        <button className="news-button" type="submit">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
