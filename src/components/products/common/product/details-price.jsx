import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Modal from "react-responsive-modal";
import { consoleLog } from "../../../../console";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
  
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
      id: item.id,
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const item = this.props.item;
    this.setState({
      nav3: this.slider3,
      variationsSelected: item.attributes
        ? item.attributes.map(i => null)
        : null,
      price: item.price,
      regularPrice: item.regularPrice,
      id: item.id,
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

  renderColor = (options, index) => {
    return options.map((vari, i) => {
      return (
        <li
          style={{
            backgroundColor: `${vari.option_name.toLowerCase()}`,
            border:
              this.state.variationsSelected &&
              this.state.variationsSelected[index] &&
              this.state.variationsSelected[index].option_name ===
                vari.option_name
                ? `1px solid black`
                : null,
          }}
          key={i}
          onClick={e => this.onSelectedOptions(index, vari)}
          title={vari.option_name}
        ></li>
      );
    });
  };

  checkNullValueVariants = variants => {
    let flag = true;
    variants.map(item => {
      if (item === null) {
        flag = false;
      }
    });
    return flag;
  };
  checkVariantValue = variant => {
    let combinations = "";
    variant.map(item => {
      combinations += item.option_id.toString();
    });

    
    this.props.item.variants &&
      this.props.item.variants.map(item => {
        if (
          item.variantCombination
            .split("")
            .sort()
            .join("") ===
          combinations
            .split("")
            .sort()
            .join("")
        ) {
          this.setState({
            id: item.id,
            price: item.price,
            regularPrice: item.regularPrice,
          });
        } else {
          this.setState({
            id: this.props.item.id,
            price: this.props.item.price,
            regularPrice: this.props.item.regularPrice,
          });
        }
      });
  };
  onSelectedOptions = (attribute_index, option) => {
    const variant = this.state.variationsSelected;

    variant[attribute_index] = option;

    if (this.checkNullValueVariants(variant)) {
      this.checkVariantValue(variant);
    }
    this.setState({
      variationsSelected: variant,
    });
  };
  renderAttributes = (options, index) => {
    return options.map((vari, i) => {
      return (
        <li
          key={i}
          style={{
            border:
              this.state.variationsSelected &&
              this.state.variationsSelected[index] &&
              this.state.variationsSelected[index].option_name ===
                vari.option_name
                ? `1px solid black`
                : null,
            padding: 1,
            marginRight: 1,
          }}
        >
          <a onClick={e => this.onSelectedOptions(index, vari)}>
            {vari.option_name}
          </a>
        </li>
      );
    });
  };
  addToCart = () => {
    const item = this.props.item;
    const productItem = {
      id: this.state.id,
      name: item.name,
      price: this.state.price,
      slug: item.slug,
      img: item.featured_img ? JSON.parse(item.featured_img) : null,
      attributes: this.state.variationsSelected
        ? this.state.variationsSelected[0] || this.state.variationsSelected[0]
          ? this.state.variationsSelected.map(item => ({
              name: item ? item.option_name : "",
            }))
          : null
        : null,
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
    return (
      <div className="col-lg-6 rtl-text">
        <div className="product-right">
          <h2> {item.name} </h2>
          {item.regularPrice !== null ? (
            <>
              <h4>
                <del>TK {this.state.regularPrice}</del>
                <span>
                  {(100 - (this.state.price / this.state.regularPrice) * 100).toFixed(0)}%
                  off
                </span>
              </h4>
              <h3>TK {this.state.price} </h3>
            </>
          ) : (
            <h3>TK {this.state.price}</h3>
          )}
          {item.attributes ? (
            <ul>
              {item.attributes.map((attribute, index) => {
                return (
                  <>
                    {attribute.attribute_name.toLowerCase() === "color" ||
                    attribute.attribute_name.toLowerCase() === "colour" ? (
                      <Slider
                        {...colorsnav}
                        asNavFor={this.props.navOne}
                        ref={slider => (this.slider1 = slider)}
                        className="color-variant"
                      >
                        {this.renderColor(attribute.options, index)}
                      </Slider>
                    ) : (
                      <Link>
                        {this.renderAttributes(attribute.options, index)}
                      </Link>
                    )}
                  </>
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
