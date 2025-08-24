import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import ProductItem from "./ProductItem.jsx";
import "swiper/css";
import "swiper/css/navigation"; // if using arrows
import "../styles/bestseller.css";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 10));
  }, [products]);

  return (
    <div className="best-seller-section">
      {bestSeller.length > 0 && (
        <img
          className="best-seller-main-img"
          src={bestSeller[bestSeller.length - 1].image[0]}
          alt=""
        />
      )}
      <div className="swipe-container">
        <h2 className="title">BEST SELLERS</h2>
        <div>
          <Swiper
            modules={[Navigation, FreeMode]}
            // modules={[FreeMode]}
            freeMode={true}
            spaceBetween={30}
            slidesPerView={1.2}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {bestSeller.map((item, index) => (
              <SwiperSlide key={index}>
                {/* <div className="product-card">
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>${item.price}</p>
            </div> */}
                <ProductItem
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              </SwiperSlide>
            ))}

            {/* Navigation buttons (only visible on desktop) */}
            <div className="swiper-button-prev desktop-only" />
            <div className="swiper-button-next desktop-only" />
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
