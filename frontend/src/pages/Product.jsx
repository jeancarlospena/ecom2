import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/assets.js";
import RelatedProducts from "../components/RelatedProducts.jsx";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="product-view-container">
      <div className="product-view">
        {/* product images */}
        <div className="imgs-display">
          <div className="img-preview-section">
            {productData.image.map((img, index) => (
              <img
                key={index}
                onClick={() => setImage(img)}
                className="small-preview-img"
                src={img}
              />
            ))}
          </div>
          <img className="main-img" src={image} alt="" />
        </div>
        {/* product info */}
        <div className="description-display">
          <h1>{productData.name}</h1>
          <div className="description-spacer rating-stars">
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_dull_icon} alt="" />
            <p>(122)</p>
          </div>
          <p className="description-spacer-2">
            {currency}
            {productData.price}
          </p>
          <p className="description-spacer p-w-control">
            {productData.description}
          </p>
          <div className="description-spacer-2 size-select">
            <p>Select Size</p>
            <div>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`description-spacer size-button ${
                    item === size ? "selected-size" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="add-cart-section">
              <button
                onClick={() => addToCart(productData._id, size)}
                className="add-cart-button"
              >
                ADD TO CART
              </button>
            </div>
          </div>
          <hr className="section-separator" />
          <div className="assurance-section">
            <p>100% Quality assured.</p>
            <p>
              Fast and easy returns on unused items within 7 days of delivery.
            </p>
            <p>Free shipping over {currency}75.</p>
          </div>
        </div>
      </div>
      <div className="review-section">
        <div>
          <button className={`review-button active-button`}>Description</button>
          <button className={`review-button`}>Reviews (122)</button>
        </div>
        <div className="review-section-info">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint facere
            fugit commodi quam, quo ratione et consectetur iusto soluta, fugiat
            repellat necessitatibus nihil amet illum nam, laboriosam dolor qui
            accusantium.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim labore
            adipisci voluptatum laborum eius perferendis fuga nesciunt cumque
            quam quibusdam quas nemo mollitia, perspiciatis repudiandae deserunt
            ipsum possimus eaque rem?
          </p>
        </div>
      </div>
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div></div>
  );
};

export default Product;
