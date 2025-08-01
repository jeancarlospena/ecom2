import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import { backendUrl } from "../App.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="active-section-container">
      <div>
        <p className="upload-p">Upload Image</p>
        <div className="upload-images">
          <label className="img-input-label" htmlFor="image1">
            <img
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              hidden
              type="file"
              id="image1"
            />
          </label>
          <label className="img-input-label" htmlFor="image2">
            <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              hidden
              type="file"
              id="image2"
            />
          </label>
          <label className="img-input-label" htmlFor="image3">
            <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              hidden
              type="file"
              id="image3"
            />
          </label>
          <label className="img-input-label" htmlFor="image4">
            <img
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              hidden
              type="file"
              id="image4"
            />
          </label>
        </div>
      </div>
      <div className="add-form-detail">
        <p>Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Add name"
          required
        />
      </div>
      <div className="add-form-detail">
        <p>Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Add description"
          required
        />
      </div>
      <div className="categories-section">
        <div className="add-form-detail">
          <p>Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="detail-dropdown"
            name=""
            id=""
          >
            <option value="Men">Men</option>
            <option value="Woman">Woman</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="add-form-detail">
          <p>Product Subcategory</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="detail-dropdown"
            name=""
            id=""
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className="add-form-price">
          <p>Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="num-input"
            type="Number"
            placeholder="25"
          />
        </div>
      </div>

      <div className="add-form-detail">
        <p>Product Sizes</p>
        <div className="sizes-section">
          <div
            className={`${sizes.includes("S") ? "picked-size" : ""}`}
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p>S</p>
          </div>
          <div
            className={`${sizes.includes("M") ? "picked-size" : ""}`}
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p>M</p>
          </div>
          <div
            className={`${sizes.includes("L") ? "picked-size" : ""}`}
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p>L</p>
          </div>
          <div
            className={`${sizes.includes("XL") ? "picked-size" : ""}`}
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p>XL</p>
          </div>
          <div
            className={`${sizes.includes("XXL") ? "picked-size" : ""}`}
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p>XXL</p>
          </div>
        </div>
      </div>

      <div className="best-seller-section">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button className="add-form-button" type="submit">
        ADD
      </button>
    </form>
  );
};

export default Add;
