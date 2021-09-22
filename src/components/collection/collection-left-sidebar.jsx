import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "../common/breadcrumb";
import NewProduct from "../common/new-product";
import Filter from "./common/filter";
import FilterBar from "./common/filter-bar";
import ProductListing from "./common/product-listing";
import StickyBox from "react-sticky-box";
import "./common/shop-products.css";
class CollectionLeftSidebar extends Component {
	state = {
		layoutColumns: 4,
	};

	LayoutViewClicked(colums) {
		this.setState({
			layoutColumns: colums,
		});
	}

	openFilter = () => {
		// document.querySelector(".collection-filter").style = "left: -15px";
		document
			.querySelector(".collection-filter")
			.classList.add("mobile-shop-sidevar");
		document
			.querySelector(".collection-filter")
			.classList.remove("close-mobile-shop-sidevar");
	};

	render() {
		return (
			<div>
				{/*SEO Support*/}
				<Helmet>
					<title>Bay Of Style | Collection of Products</title>
					<meta
						name="description"
						content="Bay Of Style – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Bay Of Style Bootstrap 4 Template will help you run multiple businesses."
					/>
				</Helmet>
				{/*SEO Support End */}

				<Breadcrumb title={"Shop"} />

				<section className="section-b-space">
					<div className="collection-wrapper">
						<div className="container">
							<div className="row">
								<div className="col-sm-3 collection-filter shop-sidebar">
									<StickyBox offsetTop={20} offsetBottom={20}>
										<div>
											<Filter />
											<NewProduct />
											{/* <div className="collection-sidebar-banner">
                                                <a href="#">
                                                    <img src={`/assets/images/side-banner.png`} className="img-fluid" alt="" />
                                                </a>
                                            </div> */}
										</div>
									</StickyBox>
									{/*side-bar banner end here*/}
								</div>
								<div className="collection-content col">
									<div className="page-main-content ">
										<div className="">
											<div className="row">
												<div className="col-sm-12">
													<div className="collection-product-wrapper">
														<div className="product-top-filter border-0">
															<div className="container-fluid p-0">
																<div className="row">
																	<div className="col-xl-12">
																		<div className="filter-main-btn filter-btn">
																			<h5
																				onClick={this.openFilter}
																				className="filter-btn btn btn-theme"
																			>
																				<svg
																					xmlns="http://www.w3.org/2000/svg"
																					width="20"
																					height="20"
																					fill="currentColor"
																					class="bi bi-filter-square"
																					viewBox="0 0 16 16"
																				>
																					<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
																					<path d="M6 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
																				</svg> 
																				&nbsp;
																				<span>
																				 Filter
																				</span>
																				
																			</h5>
																		</div>
																	</div>
																</div>
																{/* <div className="row">
                                                                    <div className="col-12">
                                                                        <FilterBar onLayoutViewClicked={(colmuns) => this.LayoutViewClicked(colmuns)}/>
                                                                    </div>
                                                                </div> */}
															</div>
														</div>

														{/*Products Listing Component*/}
													</div>

													<ProductListing colSize={this.state.layoutColumns} />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default CollectionLeftSidebar;
