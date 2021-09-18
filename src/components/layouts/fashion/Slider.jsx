import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick';
import { getSliderImages } from '../../../services/api/homePage';
const main = () => {
    const [sliderImages,setSliderImages] = useState([])
    useEffect(async()=>{
        const resData = await getSliderImages()
        // console.log(resData.data.images)
        setSliderImages(resData.data.images)
    },[])
    return (
        <div>
              <Slider  className="slide-1 home-slider">
                <div>
                {/* add image in this div  */}
                {sliderImages.map((item)=>(
                    <div className="text-center" style={{backgroundImage:`url("/assets/images/home-banner/${item.image}")`}} >
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="slider-contain">
                                    <div>
                                        <h4>welcome to bay Of Style</h4>
                                        <h1>men fashion</h1>
                                        <Link to={`/left-sidebar/collection`} className="btn btn-solid">shop now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
                ))}
                  
                </div>
                {/* <div>
                    <div className="home home2 text-center">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="slider-contain">
                                        <div>
                                            <h4>welcome to fashion</h4>
                                            <h1>women fashion</h1>
                                            <Link to={`/left-sidebar/collection`} className="btn btn-solid">shop now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </Slider>
        </div>
    )
}

export default main
