import React from "react";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error("Failed to get products, try again later");
      }
    } catch (error) {
      toast.error("Failed to get products, try again later");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Was unable to delete");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="active-section-container">
      <p>All Products List</p>
      <div className="items-table-wrapper">
        <div className="row-headings">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div className="item-row" key={index}>
            <div className="img-holder">
              <img src={item.image[0]} alt="" />
            </div>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              className="delete-action"
              onClick={() => removeProduct(item._id)}
            >
              Delete
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
