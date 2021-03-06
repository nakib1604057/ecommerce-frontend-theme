import React, { Component } from "react";
import Slider from "react-slick";
import { defaultImage } from "../../../../constants/defaultImage";
import { urls } from "../../../../constants/urls";

class SmallImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav2: null,
    };
  }
  componentDidMount() {
    this.setState({
      nav2: this.slider2,
    });
  }

  render() {
    const { item, settings } = this.props;

    var productsnav = {
      slidesToShow: item.images.length,
      slidesToScroll: 1,
      swipeToSlide: true,
      draggable: true,
      focusOnSelect: true,
    };
    console.log(item);
    return (
      <div className="row">
        <div className="col-12 p-0">
          <Slider
            {...productsnav}
            asNavFor={this.props.navOne}
            ref={slider => (this.slider2 = slider)}
            className="slider-nav"
          >
            {item.images.map((vari, index) => (
              <div key={index}>
                <img
                  src={
                    vari.file_name
                      ? "https://dlgb.bayofstyle.com/uploads/" + vari.file_name
                      : defaultImage
                  }
                  key={index}
                  alt=""
                  className="img-fluid"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}

export default SmallImages;
