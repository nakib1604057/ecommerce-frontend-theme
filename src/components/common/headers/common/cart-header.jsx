import React, { Component } from "react";
import { Link } from "react-router-dom";
import { defaultImage } from "../../../../constants/defaultImage";
import { urls } from "../../../../constants/urls";

const CartHeader = ({ item, total, symbol, removeFromCart }) => {
  const image =
    typeof item.image === "string" ? JSON.parse(item.image) : item.image;
  return (
    <li>
      <div className="media">
        <a href={`/product/${item.slug}`}>
          <img
            alt=""
            className="mr-3"
            src={
              item.image ? urls.IMAGE_URL + image.file_name : defaultImage
            }
          />
        </a>
        <div className="media-body">
          <a href={`/product/${item.slug}`}>
            <h4>{item.name}</h4>
          </a>
          <h4>
            <span>
              {item.qty} x TK {item.price}
            </span>
          </h4>
        </div>
      </div>
      {/*<span>{cart}</span>*/}
      <div className="close-circle">
        <a href={null} onClick={removeFromCart}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </a>
      </div>
    </li>
  );
};

export default CartHeader;
