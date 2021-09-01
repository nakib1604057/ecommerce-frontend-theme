import React, { Component,useEffect } from "react";
import "../../common/index.scss";
import { Link } from "react-router-dom";

// Import custom components
import TopCollection from "./top-collection";
import SpecialProducts from "../common/products";
import Instagram from "../common/instagram";
import LogoBlock from "../common/logo-block";
import Helmet from "./Helmet";
import Slider from "./Slider";
import Banner from "./Banner";
import ParallaxBanner from "./Parallax-Banner";
import BlogSection from "./BlogSection";

import {
	svgFreeShipping,
	svgservice,
	svgoffer,
} from "../../../services/script";

const Fashion = () => {
    useEffect(() => {
        // document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/color5.css` );
    
    }, [])
	return (
		<div>
			<Helmet />
			{/*Home Slider*/}
			<section className="p-0">
				<Slider />
			</section>
			{/*Home Section End*/}
			{/*collection banner*/}
			{/* <section className="pb-0">
				<Banner />
			</section> */}
			{/*collection banner end*/}

			<TopCollection type={"women"} />

			{/*Parallax banner*/}
			<section className="p-0">
				<ParallaxBanner />
			</section>
			{/*Parallax banner End*/}

			<SpecialProducts />

			{/*service layout*/}
			{/* <div className="container"></div> */}
			{/*Blog Section end*/}
			{/* <BlogSection /> */}
			{/*Blog Section End*/}

			{/* <Instagram /> */}

			{/*logo section*/}
			{/* <LogoBlock /> */}
			{/*logo section end*/}
		</div>
	);
};

export default Fashion;
