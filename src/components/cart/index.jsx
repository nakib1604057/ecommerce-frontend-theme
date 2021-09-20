import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Breadcrumb from "../common/breadcrumb";
import { getCartTotal } from "../../services";
import { removeFromCart, incrementQty, decrementQty } from "../../actions";
import { defaultImage } from "../../constants/defaultImage";
import { urls } from "../../constants/urls";
import "./cart.css";
class cartComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { cartItems, symbol, total } = this.props;
		const cartList = cartItems
		
		cartList.map(item=>{
			const id=JSON.stringify(item.image)
			console.log(JSON.parse(id))
		})
        console.log("cart items", cartList);
		return (
			<div>
				{/*SEO Support*/}
				<Helmet>
					<title>Bay Of Style | Cart List Page</title>
					<meta
						name="description"
						content="Bay Of Style – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Bay Of Style Bootstrap 4 Template will help you run multiple businesses."
					/>
				</Helmet>
				{/*SEO Support End */}

				<Breadcrumb title={"Cart Page"} />

				{cartItems.length > 0 ? (
					<section className="cart-section section-b-space">
						<div className="container">
							<div className="row">
								<div className="col-sm-12">
									<table className="table cart-table table-responsive-xs cartTable">
										<thead className="tableHead">
											<tr className="">
												<th scope="col" style={{ padding: "0.7rem" }}>
													image
												</th>
												<th scope="col " style={{ padding: "0.7rem" }}>
													product name
												</th>
												<th scope="col " style={{ padding: "0.7rem" }}>
													price
												</th>
												<th scope="col " style={{ padding: "0.7rem" }}>
													quantity
												</th>
												<th scope="col " style={{ padding: "0.7rem" }}>
													action
												</th>
												<th scope="col" style={{ padding: "0.7rem" }}>
													total
												</th>
											</tr>
										</thead>
										{cartItems.map((item, index) => {
											
											return (
												<tbody key={index}>
													<tr>
														<td>
															<Link to={`/product/${item.slug}`}>
																<img
																	src={
																		item.image
																			? urls.IMAGE_URL + item.image.file_name
																			: defaultImage
																	}
																	alt=""
																/>
															</Link>
														</td>
														<td>
															<Link
																to={`/product/${item.slug}`}
																id="tableProductName"
															>
																{item.name}
															</Link>
															<br />
															{item.attributes
																? item.attributes.map((item) => (
																		<span className="pr-1 text-danger border-bottom mr-2">
																			<strong>{item.name} </strong>
																		</span>
																  ))
																: null}
															<div className="mobile-cart-content row">
																<div className="col-xs-3">
																	<div className="qty-box">
																		<div className="input-group">
																			<input
																				type="text"
																				name="quantity"
																				className="form-control input-number"
																				defaultValue={item.qty}
																			/>
																		</div>
																	</div>
																</div>
																<div className="col-xs-3">
																	<h2 className="td-color">BDT {item.price}</h2>
																</div>
																<div className="col-xs-3">
																	<h2 className="td-color">
																		<button
																			onClick={() =>
																				this.props.removeFromCart(item)
																			}
																		>
																			<i className="icon-close"></i>
																		</button>
																	</h2>
																</div>
															</div>
														</td>
														<td>
															<h2>{item.price}/-</h2>
														</td>
														<td>
															<div className="qty-box">
																<div className="input-group">
																	<span className="input-group-prepend">
																		<button
																			type="button"
																			className="btn quantity-left-minus"
																			onClick={() =>
																				this.props.decrementQty(item.id)
																			}
																			data-type="minus"
																			data-field=""
																		>
																			<i className="fa fa-angle-left"></i>
																		</button>
																	</span>
																	<input
																		type="text"
																		name="quantity"
																		value={item.qty}
																		readOnly={true}
																		className="form-control input-number"
																	/>

																	<span className="input-group-prepend">
																		<button
																			className="btn quantity-right-plus"
																			onClick={() =>
																				this.props.incrementQty(item, 1)
																			}
																			data-type="plus"
																		>
																			<i className="fa fa-angle-right"></i>
																		</button>
																	</span>
																</div>
															</div>
														</td>
														<td>
															<a
																href="#"
																className="icon"
																onClick={() => this.props.removeFromCart(item)}
															>
																<i className="fa fa-times"></i>
															</a>
														</td>
														<td>
															<h2 className="td-color">
																{item.qty * item.price}/-
															</h2>
														</td>
													</tr>
												</tbody>
											);
										})}
									</table>
									<table className="table cart-table table-responsive-md">
										<tfoot>
											<tr>
												<td>total price :</td>
												<td>
													<h2>{total}/-</h2>
												</td>
											</tr>
										</tfoot>
									</table>
								</div>
							</div>
							<div className="row cart-buttons">
								<div className="col-6">
									<Link to={`/shop`} className="btn btn-solid">
										continue shopping
									</Link>
								</div>
								<div className="col-6">
									<Link to={`/checkout`} className="btn btn-solid">
										check out
									</Link>
								</div>
							</div>
						</div>
					</section>
				) : (
					<section className="cart-section section-b-space">
						<div className="container">
							<div className="row">
								<div className="col-sm-12">
									<div>
										<div className="col-sm-12 empty-cart-cls text-center">
											<img
												src={`/assets/images/icon-empty-cart.png`}
												className="img-fluid mb-4"
												alt=""
											/>
											<h3>
												<strong>Your Cart is Empty</strong>
											</h3>
											<h4>Explore more shortlist some items.</h4>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				)}
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	cartItems: state.cartList.cart,
	symbol: state.data.symbol,
	total: getCartTotal(state.cartList.cart),
});

export default connect(mapStateToProps, {
	removeFromCart,
	incrementQty,
	decrementQty,
})(cartComponent);
