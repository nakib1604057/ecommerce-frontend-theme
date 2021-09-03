import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Breadcrumb from "../common/breadcrumb";
import { addToCartAndRemoveWishlist, removeFromWishlist } from "../../actions";
import { defaultImage } from "../../constants/defaultImage";
import { urls } from "../../constants/urls";

class wishList extends Component {
  changeQty = e => {
    this.setState({ quantity: parseInt(e.target.value) });
  };

  addToCart = item => {
    const productItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      slug: item.slug,
      img: JSON.parse(item.featured_img),
    };
    this.props.addToCartAndRemoveWishlist(productItem, 1);
  };
  render() {
    const { Items, symbol } = this.props;

    return (
      <div>
        <Breadcrumb title={"Wishlist"} />
        {Items.length > 0 ? (
          <section className="wishlist-section section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <table className="table cart-table table-responsive-xs">
                    <thead>
                      <tr className="table-head">
                        <th scope="col">image</th>
                        <th scope="col">product name</th>

                        <th scope="col">action</th>
                      </tr>
                    </thead>
                    {Items.map((item, index) => {
                      console.log(item);
                      const image =
                        item.featured_img !== undefined
                          ? JSON.parse(item.featured_img)
                          : JSON.parse(item.image);

                      return (
                        <tbody key={index}>
                          <tr>
                            <td>
                              <Link
                                to={`${process.env.PUBLIC_URL}/product/${item.slug}`}
                              >
                                <img
                                  src={
                                    image.file_name
                                      ? urls.IMAGE_URL + image.file_name
                                      : defaultImage
                                  }
                                  alt=""
                                />
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`${process.env.PUBLIC_URL}/product/${item.slug}`}
                              >
                                {item.name}
                              </Link>
                            </td>

                            <td>
                              <a
                                href="javascript:void(0)"
                                className="icon"
                                onClick={() =>
                                  this.props.removeFromWishlist(item)
                                }
                              >
                                <i className="fa fa-times"></i>
                              </a>
                              <a
                                href="javascript:void(0)"
                                className="cart"
                                onClick={() => this.addToCart(item)}
                              >
                                <i className="fa fa-shopping-cart"></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              </div>
              <div className="row wishlist-buttons">
                <div className="col-12">
                  <Link
                    to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}
                    className="btn btn-solid"
                  >
                    continue shopping
                  </Link>
                  <Link
                    to={`${process.env.PUBLIC_URL}/checkout`}
                    className="btn btn-solid"
                  >
                    check out
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="cart-section section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div>
                    <div className="col-sm-12 empty-cart-cls text-center">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/images/empty-wishlist.png`}
                        className="img-fluid mb-4"
                        alt=""
                      />
                      <h3>
                        <strong>WhishList is Empty</strong>
                      </h3>
                      <h4>Explore more shortlist some items.</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  Items: state.wishlist.list,
  symbol: state.data.symbol,
});

export default connect(mapStateToProps, {
  addToCartAndRemoveWishlist,
  removeFromWishlist,
})(wishList);
