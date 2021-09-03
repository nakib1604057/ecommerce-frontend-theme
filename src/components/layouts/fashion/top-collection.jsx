import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";

import { getTrendingCollection } from "../../../services/index";
import { Product4, Product5 } from "../../../services/script";
import { addToCart, addToWishlist, addToCompare } from "../../../actions/index";
import ProductItem from "../common/product-item";
import axiosInstance from "../../../api/axiosInstance";
import { urls } from "../../../constants/urls";

function TopCollection({
  symbol,
  addToCart,
  addToWishlist,
  addToCompare,
  type,
}) {
  var properties = Product4;

  const [items, setItems] = useState([]);
  useEffect(() => {
    loadDiscount();
  }, []);

  const loadDiscount = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_DISCOUNTED_PRODUCTS);
      setItems([...res.data.products]);
    } catch (error) {}
  };
  return (
    <div>
      {/*Paragraph*/}
      <div className="title1  section-t-space">
        <h4>special offer</h4>
        <h2 className="title-inner1">Discount collection</h2>
      </div>
      {/*Paragraph End*/}
      <section className="section-b-space p-t-0">
        <div className="container">
          <div className="row">
            <div className="col">
              <Slider {...properties} className="product-4 product-m no-arrow">
                {items.map((product, index) => (
                  <div key={index}>
                    <ProductItem
                      product={product}
                      type="discount"
                      symbol={symbol}
                      onAddToCompareClicked={() => addToCompare(product)}
                      onAddToWishlistClicked={() => addToWishlist(product)}
                      onAddToCartClicked={() => addToCart(product, 1)}
                      key={index}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  items: getTrendingCollection(state.data.products, ownProps.type),
  symbol: state.data.symbol,
});

export default connect(mapStateToProps, {
  addToCart,
  addToWishlist,
  addToCompare,
})(TopCollection);
