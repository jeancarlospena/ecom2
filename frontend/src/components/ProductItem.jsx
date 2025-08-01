import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="product-item">
      <div className="product-item-padding">
        <div>
          <img className="product-img" src={image[0]} alt="" />
        </div>
        <p>{name}</p>
        <p>
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
