import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getBestSeller } from "../../services";
import { consoleLog } from "../../console";
import axiosInstance from "../../api/axiosInstance";
import { urls } from "../../constants/urls";
import { defaultImage } from "../../constants/defaultImage";
import "./sidebar-products.css"
const NewProduct = () => {
	const [items, setItems] = useState([]);

	const [arrays, setArrays] = useState([]);
	useEffect(() => {
		loadNewProducts();
	}, []);

	const loadNewProducts = async () => {
		try {
			const res = await axiosInstance().get(urls.GET_NEW_ARIVAL_PROUDUCT);

			setItems([...res.data.products]);

			var arrays = [];
			while (res.data.products.length > 0) {
				arrays.push(res.data.products.splice(0, 3));
			}
			setArrays(arrays);
		} catch (error) {
			consoleLog(error);
		}
	};
	consoleLog(arrays);
	return (
		<div className="theme-card">
			<h5 className="title-border">new product</h5>
			<Slider className="offer-slider slide-1">
				{arrays.map((products, index) => (
					<div key={index}>
						{products.map((product, i) => {
							const images = JSON.parse(product.image);

							return (
                <>
								<div className="media" key={i}>
									<div className="container">
										<div className="row ">
											<div className="col-4 p-0">
												<Link to={`/product/${product.slug}`}>
													<img
														className="img-fluid p-0 pt-1 pb-1 newproduct-img"
														src={
															images.file_name
																? urls.IMAGE_URL + images.file_name
																: defaultImage
														}
														alt=""
                            style={{height:'120px'}}
													/>
												</Link>
											</div>
											<div className="col-8">
												<div className="media-body align-self-center">
													<Link to={`/product/${product.slug}`}>
														<h6 className="newproduct-name mr-0">{product.name}</h6>
													</Link>
													<h4>
														Tk {product.price}
														<br></br>
														{product.regularPrice && (
															<del>
																<span className="money">
																	Tk {product.regularPrice}
																</span>
															</del>
														)}
													</h4>
												</div>
											</div>
										</div>
									</div>
                  
								</div>
                <hr className="my-2" />
                </>
							);
						})}
                

					</div>
				))}
			</Slider>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		items: getBestSeller(state.data.products),
		symbol: state.data.symbol,
	};
}

export default connect(mapStateToProps, null)(NewProduct);
