import React, { Component, useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { getTotal, getCartProducts } from "../../../reducers";
import { addToCart, addToWishlist, addToCompare } from "../../../actions";
import { getVisibleproducts } from "../../../services";
import ProductListItem from "./product-list-item";
import axiosInstance from "../../../api/axiosInstance";
import { urls } from "../../../constants/urls";
import { consoleLog } from "../../../console";

const ProductListing = props => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPageProductTotal, setLastPageProductTotal] = useState(null);

  const store = useSelector(store => store.filters);
  const dispatch = useDispatch();
  useEffect(() => {
    loadProducts(0, "changed");
  }, [store.categories]);

  const loadProducts = async (page, type = null) => {
    setIsLoading(true);
    try {
      consoleLog(page);
      const res = await axiosInstance().get(
        `${urls.GET_PRODUCTS}?page=${page + 1}&category=${store.categories}`
      );
      consoleLog(res);
      setPage(page + 1);

      setProductList(
        type ? [...res.data.products] : [...productList, ...res.data.products]
      );
      setIsLoading(false);
      setLastPageProductTotal(res.data.total_products);
    } catch (error) {
      consoleLog(error);
      setIsLoading(false);
    }
  };

  const addCart = (product, qty) => {
    dispatch(addToCart(product, qty));
  };
  const addWishList = (product) =>{
    dispatch(addToWishlist(product))
  }

  return (
    <div>
      <div className="product-wrapper-grid">
        <div className="container-fluid">
          <div className="row">
            {productList.map((product, index) => {
              return (
                <div
                  className={`${
                    props.colSize === 3
                      ? "col-xl-3 col-md-6 col-grid-box"
                      : "col-lg-" + props.colSize
                  }`}
                  key={index}
                  style={{marginBottom:'20px'}}
                >
                  <ProductListItem
                    product={product}
                    // onAddToCompareClicked={() => addToCompare(product)}
                    onAddToCartClicked={addCart}
                    onAddToWishlistClicked={addWishList}
                    key={index}
                  />
                </div>
              );
            })}
          </div>
          {isLoading && <div className="loading-cls"></div>}
          {lastPageProductTotal > 0 && (
           <div className="m-auto text-center">  <button class="btn btn-outline-danger btn-lg rounded" onClick={() => loadProducts(page)}>Load More</button></div>   
          )}
          {/* {productList.length > 0 ? (
            <InfiniteScroll
              dataLength={this.state.limit} //This is important field to render the next data
              next={this.fetchMoreItems}
              hasMore={this.state.hasMoreItems}
              loader={<div className="loading-cls"></div>}
              endMessage={
                <p className="seen-cls seen-it-cls">
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
             
            </InfiniteScroll>
          ) : (
            <div className="row">
              <div className="col-sm-12 text-center section-b-space mt-5 no-found">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/empty-search.jpg`}
                  className="img-fluid mb-4"
                />
                <h3>
                  Sorry! Couldn't find the product you were looking For!!!{" "}
                </h3>
                <p>
                  Please check if you have misspelt something or try searching
                  with other words.
                </p>
                <Link
                  to={`${process.env.PUBLIC_URL}/`}
                  className="btn btn-solid"
                >
                  continue shopping
                </Link>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  products: getVisibleproducts(state.data, state.filters),
  symbol: state.data.symbol,
});

export default ProductListing;
