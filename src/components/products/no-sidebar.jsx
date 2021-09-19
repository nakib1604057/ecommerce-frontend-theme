import React, { Component } from "react";
import Slider from "react-slick";
import "../common/index.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getRelatedProducts } from "../../services/api/ecommerce";
import { productImg } from "../../constants/image";
// import custom Components
import RelatedProduct from "../common/related-product";
import Breadcrumb from "../common/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import { addToCart, addToCartUnsafe, addToWishlist } from "../../actions";
import ImageZoom from "./common/product/image-zoom";
import SmallImages from "./common/product/small-image";
import { consoleLog } from "../../console";
import axiosInstance from "../../api/axiosInstance";
import { urls } from "../../constants/urls";
import relatedProduct from "../common/related-product";


class NoSideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nav1: null,
			nav2: null,
			item: null,
			loading: true,
			item: [],
			relatedProducts: [],
		};
	}

	componentDidMount() {
		const slug = this.props.match.params.slug;
		this.setState({
			nav1: this.slider1,
			nav2: this.slider2,
		});
		this.loadProductDetails(slug);
	}

	loadProductDetails = async (slug) => {
		try {
			const res = await axiosInstance().get(`${urls.GET_PRODUCTS}/${slug}`);
		
			this.setState({ item: res.data.product, loading: false });

			const categoryId = this.state.item.categories[0].category_id;
			const productId = this.state.item.id;
			const similarProducts = await getRelatedProducts(categoryId, productId);
			consoleLog(similarProducts);
			// consoleLog(productId)
			this.setState({ relatedProducts: similarProducts.data.data.products });
		} catch (error) {
			this.setState({ loading: false });
			consoleLog(error);
		}
	};

	render() {
		const { symbol, addToCart, addToCartUnsafe, addToWishlist } = this.props;
		var products = {
			fade: true,
		};

		const { item,relatedProducts } = this.state;
    
		var productsnav = {
			slidesToShow: 3,
			slidesToScroll: 1,
			swipeToSlide: true,
			draggable: true,
			focusOnSelect: true,
		};
		if (this.state.loading) {
			return <div className="loading-cls"></div>;
		}
		return (
			<div>
				<Breadcrumb title={" Product / " + item.name} />

				{/*Section Start*/}
				{item ? (
					<section>
						<div className="collection-wrapper">
							<div className="container">
								<div className="row">
									<div className="col-lg-1"></div>
									<div className="col-lg-4 product-thumbnail">
										<Slider
											// {...products}
											asNavFor={this.state.nav2}
											ref={(slider) => (this.slider1 = slider)}
											className="product-slick"
										>
											{item.images.map((vari, index) => {
												return (
													<div key={index}>
														<ImageZoom
															image={vari.file_name}
															className="img-fluid image_zoom_cls-0"
														/>
													</div>
												);
											})}
										</Slider>
										<SmallImages
											item={item}
											settings={productsnav}
											navOne={this.state.nav1}
										/>
									</div>
									<div className="col-lg-1"></div>
									<DetailsWithPrice
										symbol={symbol}
										item={item}
										navOne={this.state.nav1}
										addToCartClicked={addToCart}
										BuynowClicked={addToCartUnsafe}
										addToWishlistClicked={addToWishlist}
									/>
								</div>
							</div>
						</div>
					</section>
				) : (
					""
				)}
				{/*Section End*/}

				<section className="tab-product m-0">
					<div className="container">
						<div className="row">
							<div className="col-sm-12 col-lg-12">
								<DetailsTopTabs item={item} />
							</div>
						</div>
					</div>
				</section>
				{this.state.relatedProducts ? (
					<>
						<RelatedProduct  relatedProducts={relatedProducts}/>
					</>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	let productId = ownProps.match.params.id;
	return {
		item: state.data.products.find((el) => el.id == productId),
		symbol: state.data.symbol,
	};
};

export default connect(mapStateToProps, {
	addToCart,
	addToCartUnsafe,
	addToWishlist,
})(withRouter(NoSideBar));
