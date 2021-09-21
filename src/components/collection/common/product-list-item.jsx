import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { defaultImage } from "../../../constants/defaultImage";
import { urls } from "../../../constants/urls";
import  '../../layouts/common/common.css';
import { consoleLog } from "../../../console";

class ProductListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      stock: "InStock",
      quantity: 1,
      image: "",
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onClickHandle(img) {
    this.setState({ image: img });
  }

  minusQty = () => {
    if (this.state.quantity > 1) {
      this.setState({ stock: "InStock" });
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  plusQty = () => {
    if (this.props.product.stock >= this.state.quantity) {
      this.setState({ quantity: this.state.quantity + 1 });
    } else {
      this.setState({ stock: "Out of Stock !" });
    }
  };
  changeQty = e => {
    this.setState({ quantity: parseInt(e.target.value) });
  };

  onAddCart = product => {
    this.props.onAddToCartClicked(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        slug: product.slug,
        image: product.featured_img
          ? JSON.parse(product.featured_img)
          : product.image
          ? JSON.parse(product.image)
          : null,
        attributes: null,
      },
      1
    );
  };
  render() {
    const {
      product,
      symbol,
      onAddToCartClicked,
      onAddToWishlistClicked,
      onAddToCompareClicked,
    } = this.props;
    const { open } = this.state;

    const image = JSON.parse(product.image);
    return (
      <div
        className="product-box mb-2 product-card"
        
      >
        <div className="img-wrapper">
          <div className="front">
            <Link to={`/product/${product.slug}`}>
              <img
                src={
                  image.file_name
                    ? urls.IMAGE_URL + image.file_name
                    : defaultImage
                }
                className="img-fluid fixed-img-height"
                alt=""
              />
            </Link>
          </div>
          <div
            className="cart-info cart-wrap cart-wishlist-icon"
            style={{
              
              marginRight: "10px",
              marginBottom: "20px",
            }}
          >
            <button title="Add to cart" onClick={() => this.onAddCart(product)}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </button>
            <Link
              title="Add to Wishlist"
              onClick={() => this.props.onAddToWishlistClicked(product)}
            >
              <i className="fa fa-heart" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
        <div className="product-detail" style={{ padding: "12px" }}>
          <div>
            <Link to={`/product/${product.slug}`}>
              <h6 className="product-name">{product.name}</h6>
            </Link>
            <h4>
              TK {product.discount || product.price}
              {product.discount && (
                <del>
                  <span className="money">
                    TK
                    {product.price}
                  </span>
                </del>
              )}
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
