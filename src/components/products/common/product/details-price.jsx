import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Modal from "react-responsive-modal";
import { consoleLog } from "../../../../console";

class DetailsWithPrice extends Component {
  constructor(props) {
    super(props);
    const item = this.props;

    this.state = {
      open: false,
      quantity: 1,
      stock: item.inStock,
      nav3: null,
      price: item.price,
      regularPrice: item.regularPrice,
      variationsSelected: null,
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.setState({
      nav3: this.slider3,
    });
  }

  minusQty = () => {
    if (this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  plusQty = () => {
    this.setState({ quantity: this.state.quantity + 1 });
  };
  changeQty = e => {
    this.setState({ quantity: parseInt(e.target.value) });
  };

  renderColor = options => {
    return options.map((vari, i) => {
      return (
        <li
          style={{ backgroundColor: `${vari.option_name.toLowerCase()}` }}
          key={i}
          title={vari.option_name}
        ></li>
      );
    });
  };
  onSelectedOptions = (attribute_index, option_name) => {
    console.log(attribute_index, "asdasd");
  };
  renderAttributes = (options, index) => {
    return options.map((vari, i) => {
      return (
        <li key={i}>
          <a onClick={e => console.log(e)}>{vari.option_name}</a>
        </li>
      );
    });
  };
  addToCart = () => {
    console.log(this.props.item);
    const item = this.props.item;
    const productItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      slug: item.slug,
      img: JSON.parse(item.featured_img),
    };
    this.props.addToCartClicked(productItem, this.state.quantity);
  };
  render() {
    const {
      symbol,
      item,
      addToCartClicked,
      BuynowClicked,
      addToWishlistClicked,
    } = this.props;

    var colorsnav = {
      slidesToShow: 6,
      swipeToSlide: true,
      arrows: false,
      dots: false,
      focusOnSelect: true,
    };
    console.log(item.price);
    return (
      <div className="col-lg-6 rtl-text">
        <div className="product-right">
          <h2> {item.name} </h2>
          {item.regularPrice !== null ? (
            <>
              <h4>
                <del>BDT {item.regularPrice}</del>
                <span>{(item.price / item.regularPrice) * 100}% off</span>
              </h4>
              <h3>BDT {item.price} </h3>
            </>
          ) : (
            <h3>BDT {item.price}</h3>
          )}
          {item.attributes ? (
            <ul>
              {item.attributes.map((attribute, index) => {
                return (
                  <Slider
                    {...colorsnav}
                    asNavFor={this.props.navOne}
                    ref={slider => (this.slider1 = slider)}
                    className="color-variant"
                  >
                    {attribute.attribute_name.toLowerCase() === "color" ||
                    attribute.attribute_name.toLowerCase() === "colour"
                      ? this.renderColor(attribute.options, index)
                      : this.renderAttributes(attribute.options, index)}
                  </Slider>
                );
              })}
            </ul>
          ) : (
            ""
          )}

          <div className="product-description border-product">
            <span className="instock-cls">{item.inStock}</span>
            <h6 className="product-title">quantity</h6>
            <div className="qty-box">
              <div className="input-group">
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-left-minus"
                    onClick={this.minusQty}
                    data-type="minus"
                    data-field=""
                  >
                    <i className="fa fa-angle-left"></i>
                  </button>
                </span>
                <input
                  type="text"
                  name="quantity"
                  value={this.state.quantity}
                  // onChange={this.changeQty}
                  readOnly
                  className="form-control input-number"
                />
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-right-plus"
                    onClick={this.plusQty}
                    data-type="plus"
                    data-field=""
                  >
                    <i className="fa fa-angle-right"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="product-buttons">
            <a className="btn btn-solid" onClick={() => this.addToCart()}>
              add to cart
            </a>
            <Link
              to={`${process.env.PUBLIC_URL}/checkout`}
              className="btn btn-solid"
              onClick={() => BuynowClicked(item, this.state.quantity)}
            >
              buy now
            </Link>
          </div>
          <div className="border-product">
            <h6 className="product-title">product details</h6>
            <p>
              <div
                dangerouslySetInnerHTML={{ __html: item.shortDescription }}
              ></div>
            </p>
          </div>
          <div className="border-product">
            <div className="product-icon">
              <button
                className="wishlist-btn"
                onClick={() => addToWishlistClicked(item)}
              >
                <i className="fa fa-heart"></i>
                <span className="title-font">Add To WishList</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailsWithPrice;
