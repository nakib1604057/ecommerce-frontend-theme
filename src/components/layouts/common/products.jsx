import React, { Component, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connect } from "react-redux";
import { getNewProducts } from "../../../services/api/homePage";
import {
	getBestSeller,
	getMensWear,
	getWomensWear,
} from "../../../services/index";
import { addToCart, addToWishlist, addToCompare } from "../../../actions/index";
import ProductItem from "./product-item";

const SpecialProducts = ({
	bestSeller,
	mensWear,
	womensWear,
	symbol,
	addToCart,
	addToWishlist,
	addToCompare,
}) => {
	const [newProduct, setNewProduct] = useState([]);
	const [fearuredProduct, setFeaturedProduct] = useState();
	const [popularProduct, setPopularProduct] = useState();
	useEffect(async () => {
		try {
			const newProductData = await getNewProducts();
			setNewProduct(newProductData.data.products);
		} catch (err) {
			console.log(err);
		}
	}, []);

	return (
		<div>
			<div className="title1 section-t-space">
				<h4>exclusive products</h4>
				<h2 className="title-inner1">special products</h2>
			</div>
			<section className="section-b-space p-t-0">
				<div className="container">
					<Tabs className="theme-tab">
						<TabList className="tabs tab-title">
							<Tab>New Products</Tab>
							<Tab>Mens Wear</Tab>
							<Tab>Womens Wear</Tab>
						</TabList>

						<TabPanel>
							<div className="no-slider row">
								{bestSeller.map((product, index) => (
									<ProductItem
										product={product}
										symbol={symbol}
										onAddToCompareClicked={() => addToCompare(product)}
										onAddToWishlistClicked={() => addToWishlist(product)}
										onAddToCartClicked={() => addToCart(product, 1)}
										key={index}
									/>
								))}
							</div>
						</TabPanel>
						<TabPanel>
							<div className="no-slider row">
								{mensWear.map((product, index) => (
									<ProductItem
										product={product}
										symbol={symbol}
										onAddToCompareClicked={() => addToCompare(product)}
										onAddToWishlistClicked={() => addToWishlist(product)}
										onAddToCartClicked={() => addToCart(product, 1)}
										key={index}
									/>
								))}
							</div>
						</TabPanel>
						<TabPanel>
							<div className=" no-slider row">
								{womensWear.map((product, index) => (
									<ProductItem
										product={product}
										symbol={symbol}
										onAddToCompareClicked={() => addToCompare(product)}
										onAddToWishlistClicked={() => addToWishlist(product)}
										onAddToCartClicked={() => addToCart(product, 1)}
										key={index}
									/>
								))}
							</div>
						</TabPanel>
					</Tabs>
				</div>
			</section>
		</div>
	);
};

const mapStateToProps = (state) => ({
	bestSeller: getBestSeller(state.data.products),
	mensWear: getMensWear(state.data.products),
	womensWear: getWomensWear(state.data.products),
	symbol: state.data.symbol,
});

export default connect(mapStateToProps, {
	addToCart,
	addToWishlist,
	addToCompare,
})(SpecialProducts);