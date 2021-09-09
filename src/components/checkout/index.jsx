import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PaypalExpressBtn from "react-paypal-express-checkout";
import SimpleReactValidator from "simple-react-validator";
import Breadcrumb from "../common/breadcrumb";
import { removeFromWishlist } from "../../actions";
import { getCartTotal } from "../../services";
import { divisions } from "../../constants/bdDivison";
import { districts } from "../../constants/district";
import { isUserLoggedIn } from "../../constants/utils";
import SuccessPage from "./success-page";
import {
	defaultImage,
	bkashImage,
	rocketImage,
	nogodImage,
} from "../../constants/defaultImage";
import classNames from "classnames";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { countries } from "../../constants/SelectTag";
import axios from "axios";
import { checkoutOrders } from "../../services/api/ecommerce";
import { getPaymentGetwayNumbers } from "../../services/api/themeApi";


class checkOut extends Component {
	constructor(props) {
		super(props);

		this.state = {
			payment: "Online Payment",
			first_name: "",
			last_name: "",
			phone: "",
			email: "",
			address: "",
			country: countries[0].value,
			city: districts[0].name,
			state: divisions[0].name,
			pincode: "",
			create_account: "",
			payment_medium: "Bkash",
			message: "",
			payPhnNumber: "",
			transId: "",
			payPhnNumberError: "",
			transIdError: "",
			// payment_option_number:'',
			
		};
		this.validator = new SimpleReactValidator();
	}

	setStateFromInput = (event) => {
		var obj = {};
		obj[event.target.name] = event.target.value;
		this.setState(obj);
	};

	setStateFromCheckbox = (event) => {
		var obj = {};
		obj[event.target.name] = event.target.checked;
		this.setState(obj);

		if (!this.validator.fieldValid(event.target.name)) {
			this.validator.showMessages();
		}
	};
	handlePaymentOption(e, value) {
		e.preventDefault();
		// console.log(value)
		this.setState({ payment_medium: value });
	}
	checkhandle(value) {
		this.setState({
			payment: value,
		});
	}
	checkPayNumberTranId = () => {
		if (this.state.payPhnNumber=='' || this.state.payPhnNumber.length < 11) {
			this.setState({
				payPhnNumberError:
					"Please give valid phonenumber you transfering amount.",
			});
			return false;
		}
		if (!this.state.transId || this.state.transId.length < 11) {
			this.setState({
				transIdError: "Transaction Id need to be valid.",
			});
			return false;
		}
		return true
	};
	onPlaceOrder = async (e) => {
		if (this.validator.allValid()) {
			if (this.state.payment === "Online Payment") {
				if (!this.checkPayNumberTranId()) {
					return;
				}
			}
			const user = await isUserLoggedIn();
			const userId = user.id;
			// console.log(this.props.cartItems);

			const data = {
				userId: userId,
				email: this.state.email,
				fullName: `${this.state.first_name} ${this.state.last_name}`,
				phoneNumber: this.state.phone,
				division: this.state.state,
				country: this.state.country,
				city: this.state.city,
				address: this.state.address,
				payOption: this.state.payment,
				payMedium:
					this.state.payment === "Cash on Delivery"
						? null
						: this.state.payment_medium,
				message:
					this.state.payment === "Cash on Delivery" ? this.state.message : "",
				payPhnNumber:
					this.state.payment !== "Cash on Delivery"
						? this.state.payPhnNumber
						: null,
				transId:
					this.state.payment !== "Cash on Delivery" ? this.state.transId : null,
				orderedItems: this.props.cartItems
					? this.props.cartItems.map((item) => ({
							productId: item.id,
							qty: item.qty,
							variants: null,
							name: item.name,
							price: item.price,
					  }))
					: [],
				totalCost: 1200,
				shippingCost: 0,
			};
			this.placeOrder(data);
			console.log(data);
		} else {
			this.validator.showMessages();
			// rerender to show messages for the first time
			this.forceUpdate();
		}
	};

	placeOrder = async (data) => {
		try {
			console.log(data);

			const res = await checkoutOrders(data);
			toast.success(res.data.message);
			this.props.history.push({
				pathname:"/user/dashboard"
			})
			// this.props.history.push({
			// 	pathname: "/order-success",
			// 	state: {
			// 		payment: 1321231,
			// 		items: this.props.cartItems,
			// 		orderTotal: this.props.total,
			// 		symbol: this.props.symbol,
			// 	},
			// });
		} catch (error) {
			console.log(error.data);
			toast.error("Something Went Wrong.Try Again.");
		}
	};

	render() {
		const { cartItems, symbol, total, info } = this.props;

		// Paypal Integration

		return (
			<div>
				{/*SEO Support*/}
				<Helmet>
					<title>Bay Of Style | CheckOut Page</title>
					<meta
						name="description"
						content="Bay Of Style – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Bay Of Style Bootstrap 4 Template will help you run multiple businesses."
					/>
				</Helmet>
				{/*SEO Support End */}

				<Breadcrumb title={"Checkout"} />

				<section className="section-b-space">
					<div className="container padding-cls">
						<div className="checkout-page">
							<div className="checkout-form">
								<form>
									<div className="checkout row">
										<div className="col-lg-6 col-sm-12 col-xs-12">
											<div className="checkout-title">
												<h3>Billing Details</h3>
											</div>
											<div className="row check-out">
												<div className="form-group col-md-6 col-sm-6 col-xs-12">
													<div className="field-label">First Name</div>
													<input
														type="text"
														name="first_name"
														value={this.state.first_name}
														onChange={this.setStateFromInput}
													/>
													{this.validator.message(
														"first_name",
														this.state.first_name,
														"required|alpha"
													)}
												</div>
												<div className="form-group col-md-6 col-sm-6 col-xs-12">
													<div className="field-label">Last Name</div>
													<input
														type="text"
														name="last_name"
														value={this.state.last_name}
														onChange={this.setStateFromInput}
													/>
													{this.validator.message(
														"last_name",
														this.state.last_name,
														"required|alpha"
													)}
												</div>
												<div className="form-group col-md-6 col-sm-6 col-xs-12">
													<div className="field-label">Phone</div>
													<input
														type="text"
														name="phone"
														value={this.state.phone}
														onChange={this.setStateFromInput}
													/>
													{this.validator.message(
														"phone",
														this.state.phone,
														"required|phone"
													)}
												</div>
												<div className="form-group col-md-6 col-sm-6 col-xs-12">
													<div className="field-label">Email Address</div>
													<input
														type="text"
														name="email"
														value={this.state.email}
														onChange={this.setStateFromInput}
													/>
													{this.validator.message(
														"email",
														this.state.email,
														"required|email"
													)}
												</div>
												<div className="form-group col-md-12 col-sm-12 col-xs-12">
													<div className="country">Country</div>
													<select
														name="country"
														id="country"
														onChange={(e) => {
															this.setState({
																country: e.target.value,
															});
														}}
													>
														{countries.map((country) => (
															<option value={country.label}>
																{country.value}
															</option>
														))}
													</select>
												</div>
												<div className="form-group col-md-12 col-sm-6 col-xs-12">
													<div className="field-label">State / Division</div>
													<div className="form-group">
														{/* <label for="division">State/Division</label> */}
														<select
															id="division"
															name="division"
															// value={userData.division}
															// class="form-control rounded border border-primary"
															onChange={(e) => {
																this.setState({
																	state: e.target.value,
																});
															}}
														>
															{divisions.map((item) => (
																<option value={item.name}> {item.label}</option>
															))}
														</select>
													</div>
													{/* <input
														type="text"
														name="state"
														value={this.state.state}
														onChange={this.setStateFromInput}
													/> */}
													{/* {this.validator.message(
														"state",
														this.state.state,
														"required|alpha"
													)} */}
												</div>
												<div className="form-group col-md-12 col-sm-12 col-xs-12">
													<div className="field-label">Town/City</div>
													<div className="form-group">
														{/* <label for="city">City</label> */}
														<select
															id="city"
															name="city"
															// class="form-control rounded border border-primary"
															// value={userData.city}
															onChange={(e) => {
																this.setState({
																	country: e.target.value,
																});
															}}
														>
															{districts.map((item) => (
																<option value={item.name}>{item.name}</option>
															))}
														</select>
													</div>

													{/*                                 
													<input
														type="text"
														name="city"
														value={this.state.city}
														onChange={this.setStateFromInput}
													/> */}
													{/* {this.validator.message(
														"city",
														this.state.city,
														"required|alpha"
													)} */}
												</div>

												<div className="form-group col-md-12 col-sm-12 col-xs-12">
													<div className="field-label">Address</div>
													<input
														type="text"
														name="address"
														value={this.state.address}
														onChange={this.setStateFromInput}
														placeholder="Street address"
													/>
													{this.validator.message(
														"address",
														this.state.address,
														"required|min:10|max:120"
													)}
												</div>
											</div>
										</div>
										<div className="col-lg-6 col-sm-12 col-xs-12">
											<div className="checkout-details">
												<div className="order-box">
													<div className="title-box">
														<div>
															Product <span> Total</span>
														</div>
													</div>
													<ul className="qty">
														{cartItems.map((item, index) => {
															return (
																<li key={index}>
																	{item.name} × {item.qty}{" "}
																	<span>{item.qty * item.price} TK</span>
																</li>
															);
														})}
													</ul>
													<ul className="sub-total">
														<li>
															Subtotal <span className="count">{total} TK</span>
														</li>
													</ul>

													<ul className="total">
														<li>
															Total <span className="count">{total} TK</span>
														</li>
													</ul>
												</div>

												<div className="payment-box">
													<div className="upper-box">
														<div className="payment-options">
															<ul>
																<li>
																	<div className="radio-option stripe">
																		<input
																			type="radio"
																			name="payment-group"
																			id="payment-2"
																			defaultChecked={true}
																			onClick={() =>
																				this.checkhandle("Online Payment")
																			}
																		/>
																		<label htmlFor="payment-2">
																			Online Payment
																		</label>
																	</div>
																</li>
																<li>
																	<div className="radio-option paypal">
																		<input
																			type="radio"
																			name="payment-group"
																			id="payment-1"
																			onClick={() =>
																				this.checkhandle("Cash on Delivery")
																			}
																		/>
																		<label htmlFor="payment-1">
																			Cash On Delivery
																		</label>
																	</div>
																</li>
															</ul>
														</div>
													</div>
													<hr />
													{total !== 0 ? (
														<div className="">
															{this.state.payment === "Online Payment" ? (
																<div className="borderd">
																	<div className="row">
																		<div className="col-lg-4 text-center">
																			<button
																				className=" w-75 rounded btn"
																				style={{
																					border:
																						this.state.payment_medium ===
																						"Bkash"
																							? "1px solid"
																							: "0px",
																				}}
																				onClick={(e) =>
																					this.handlePaymentOption(e, "Bkash")
																				}
																			>
																				<img
																					src={bkashImage}
																					alt=""
																					width="40px"
																				/>
																			</button>
																		</div>
																		<div className="col-lg-4 text-center">
																			<button
																				className="btn w-75 rounded"
																				style={{
																					border:
																						this.state.payment_medium ===
																						"Rocket"
																							? "1px solid"
																							: "0px",
																				}}
																				onClick={(e) =>
																					this.handlePaymentOption(e, "Rocket")
																				}
																			>
																				<img
																					src={rocketImage}
																					alt=""
																					width="45px"
																				/>
																			</button>
																		</div>

																		<div className="col-lg-4 text-center">
																			<button
																				className="btn w-75 rounded"
																				style={{
																					border:
																						this.state.payment_medium ===
																						"Nagad"
																							? "1px solid"
																							: "0px",
																				}}
																				onClick={(e) =>
																					this.handlePaymentOption(e, "Nagad")
																				}
																			>
																				<img
																					src={nogodImage}
																					alt=""
																					width="40px"
																				/>
																			</button>
																		</div>
																	</div>
																	<div
																		className="text-danger text-center "
																		style={{
																			marginTop: "6px",
																			marginBottom: "6px",
																		}}
																	></div>
																	<div
																		style={{ margin: "20px 0px" }}
																		className="text-center text-danger"
																	>
																		<strong>
																			Please send money to this number{" "}
																			{info.map((i) => {
																				return (
																					this.state.payment_medium ===
																						i.payment_name &&
																					`0${i.payment_number}`
																				);
																			})}
																		</strong>
																	</div>
																	<div className="form-group ">
																		<div className="field-label">
																			Your Payment Phone Number
																		</div>
																		<input
																			type="text"
																			name="payphone"
																			value={this.state.payPhnNumber}
																			onChange={(e) =>
																				this.setState({
																					payPhnNumber: e.target.value,
																					payPhnNumberError:null,
																				})
																			}
																		/>
																		{this.state.payPhnNumberError?(<p className="text-danger">{this.state.payPhnNumberError}</p>):(null)}
																	</div>
																	<div className="form-group ">
																		<div className="field-label">
																			Transaction Id
																		</div>

																		<input
																			type="text"
																			name="textId"
																			value={this.state.transId}
																			onChange={(e) =>
																				this.setState({
																					transId: e.target.value,
																					transIdError:null,
																				})
																			}
																		/>
																		{this.state.transIdError?(<p className="text-danger">{this.state.transIdError} </p>):(null)}
																	</div>
																	
																</div>
															) : (
																<div className="form-group">
																	<div className="field-label">
																		Please write a message
																	</div>
																	<textarea
																		name="payment_message"
																		id=""
																		rows="10"
																		value={this.state.message}
																		onChange={(e) =>
																			this.setState({ message: e.target.value })
																		}
																	></textarea>
																</div>
															)}
															<button
																type="button"
																className="btn-solid btn"
																onClick={this.onPlaceOrder}
															>
																Place Order
															</button>
														</div>
													) : (
														""
													)}
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	cartItems: state.cartList.cart,
	symbol: state.data.symbol,
	total: getCartTotal(state.cartList.cart),
	info: state.companyInfo.info.paymentDetails,
});

export default connect(mapStateToProps, { removeFromWishlist })(checkOut);
