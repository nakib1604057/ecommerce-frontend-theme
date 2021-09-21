import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { urls } from "../../../constants/urls";
import { getSliderImages } from "../../../services/api/homePage";

const main = () => {
  const [sliderImages, setSliderImages] = useState([]);
  useEffect(async () => {
    const resData = await getSliderImages();
    console.log(resData.data.images);
    setSliderImages(resData.data.images);
  }, []);

  return (
    <div>
      <Slider className="slide-1 home-slider ">
        {sliderImages.map(item => {
          // const imageUrl = ${urls.IMAGE_URL}${item.image};
          // console.log(imageUrl);
          return (
            <div >
              {/* add image in this div  */}

              <div
                className="text-center"
                style={{
                  backgroundImage: `url("${urls.IMAGE_URL}${item.image}")`,
                }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="slider-contain">
                        <div>
                          <h4>welcome to bay Of Style</h4>
                          {/* <h1>men fashion</h1> */}
                          <Link to={`/shop`} className="btn btn-solid">
                            shop now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default main;
