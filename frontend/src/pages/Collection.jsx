import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/assets.js";
import Title from "../components/Title.jsx";
import ProductItem from "../components/ProductItem.jsx";
import axios from "axios";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevent");

  // populate database...admin auth needs to be removed on backend
  // const uploadStaticImage = async (product) => {
  //   const imgResponse1 = await fetch(product.image[0]);
  //   const image1 =
  //     imgResponse1 &&
  //     imgResponse1.ok &&
  //     imgResponse1.url !== "http://localhost:5173/undefined"
  //       ? await imgResponse1.blob()
  //       : false;

  //   const imgResponse2 = await fetch(product.image[1]);
  //   const image2 =
  //     imgResponse2 &&
  //     imgResponse2.ok &&
  //     imgResponse2.url !== "http://localhost:5173/undefined"
  //       ? await imgResponse2.blob()
  //       : false;

  //   const imgResponse3 = await fetch(product.image[2]);
  //   const image3 =
  //     imgResponse3 &&
  //     imgResponse3.ok &&
  //     imgResponse3.url !== "http://localhost:5173/undefined"
  //       ? await imgResponse3.blob()
  //       : false;

  //   const imgResponse4 = await fetch(product.image[3]);
  //   const image4 =
  //     imgResponse4 &&
  //     imgResponse4.ok &&
  //     imgResponse4.url !== "http://localhost:5173/undefined"
  //       ? await imgResponse4.blob()
  //       : false;

  //   const formData = new FormData();
  //   formData.append("name", product.name);
  //   formData.append("description", product.description);
  //   formData.append("price", product.price);
  //   formData.append("category", product.category);
  //   formData.append("subCategory", product.subCategory);
  //   formData.append("bestSeller", product.bestSeller);
  //   formData.append("sizes", JSON.stringify(product.sizes));

  //   // ✅ ADD FILE NAMES TO BLOB APPENDS
  //   image1 && formData.append("image1", image1, `${product.name}_1.png`);
  //   image2 && formData.append("image2", image2, `${product.name}_2.png`);
  //   image3 && formData.append("image3", image3, `${product.name}_3.png`);
  //   image4 && formData.append("image4", image4, `${product.name}_4.png`);

  //   const response = await axios.post(
  //     "http://localhost:4000/api/product/add",
  //     formData
  //   );
  //   console.log(response);
  // };

  // useEffect(() => {
  //   const uploadAll = async () => {
  //     for (let i = 0; i < products.length; i++) {
  //       await uploadStaticImage(products[i]); // ✅ Ensure serial upload
  //     }
  //   };
  //   // uploadAll();
  // }, []);
  // ==================================
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubcategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [products, category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="collection-screen">
      {/* filter section */}
      <div className="filter-options">
        <div
          className={`head-filter cursor`}
          onClick={() => setShowFilter(!showFilter)}
        >
          <h2 className="section-heading">Filters</h2>
          <img
            className={`filter-icon ${showFilter ? "rotate-filter-icon" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </div>
        <div className={`${showFilter ? "" : "hide-section"}`}>
          <div className={`cat-section `}>
            <h3>Categories</h3>
            <div className="options-selection">
              <p>
                <input
                  type="checkbox"
                  value={"Men"}
                  onChange={toggleCategory}
                />
                Men
              </p>
              <p>
                <input
                  type="checkbox"
                  value={"Women"}
                  onChange={toggleCategory}
                />
                Women
              </p>
              <p>
                <input
                  type="checkbox"
                  value={"Kids"}
                  onChange={toggleCategory}
                />
                Kids
              </p>
            </div>
          </div>
          <div className="cat-section">
            <h3>Type</h3>
            <div className="options-selection">
              <p>
                <input
                  type="checkbox"
                  value={"Topwear"}
                  onChange={toggleSubcategory}
                />
                Topwear
              </p>
              <p>
                <input
                  type="checkbox"
                  value={"Bottomwear"}
                  onChange={toggleSubcategory}
                />
                Bottomwear
              </p>
              <p>
                <input
                  type="checkbox"
                  value={"Winterwear"}
                  onChange={toggleSubcategory}
                />
                Winterwear
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* right side items section */}
      <div className="right-collection-section">
        <div className="right-collection-top">
          <Title text={"All collections."} />
          <select onChange={(e) => setSortType(e.target.value)} name="" id="">
            <option value="relevent">Sort by: Relevent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* map produts */}
        <div className="products-section">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
