import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { defaultImage } from "../../../constants/defaultImage";
import { urls } from "../../../constants/urls";
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
    console.log('sdsd')
    this.props.onAddToCartClicked(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        slug: product.slug,
        img: product.featured_img ? JSON.parse(product.featured_img) : null,
        attributes: null,
      },
      1
    );
  };
  render() {
    const {
      product,
    } = this.props;
    const { open } = this.state;
    
    const image = JSON.parse(product.image);
    console.log(urls.IMAGE_URL + image.file_name)
    return (
      <div className="product-box mb-2"style={{boxShadow: "0px 0px 12px rgb(132 124 124 / 30%)" ,marginBottom:'20px'}} >
        <div className="img-wrapper">
          <div className="front">
            <Link to={`${process.env.PUBLIC_URL}/product/${product.slug}`}>
              <img
                src={
                  image.file_name && process.env.NODE_ENV !== "development"
                    ? urls.IMAGE_URL + image.file_name
                    : defaultImage
                }
                className="img-fluid"
                alt=""
              />
            </Link>
          </div>
          <div className="cart-info cart-wrap" style={{background: "rgb(255 255 255 / 90%)",borderRadius:"20px",marginRight: "10px",marginBottom: "20px"}}>
            <button title="Add to cart" onClick={() => this.onAddCart(product)}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </button>
            <Link
              to="javascript:void(0)"
              title="Add to Wishlist"
              onClick={onAddToWishlistClicked}
            >
              <i className="fa fa-heart" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
        <div className="product-detail" style={{padding:"12px"}}>
          <div>
            <Link to={`${process.env.PUBLIC_URL}/product/${product.slug}`}>
              <h6>{product.name}</h6>
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
