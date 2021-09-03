import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PaypalExpressBtn from "react-paypal-express-checkout";
import SimpleReactValidator from "simple-react-validator";
import Breadcrumb from "../common/breadcrumb";
import { removeFromWishlist } from "../../actions";
import { getCartTotal } from "../../services";

import {
	defaultImage,
	bkashImage,
	rocketImage,
	nogodImage,
} from "../../constants/defaultImage";
import classNames from "classnames";

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
			city: "",
			state: "",
			pincode: "",
			create_account: "",
			payment_medium: "Bkash",
			payment_medium_bkash_number:'0171111101',
			payment_medium_rocket_number:'0162222202',
			payment_medium_nogod_number:'0193333303',
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

	onPlaceOrder = (e) => {
		if (this.validator.allValid()) {
			const data = {
				email: this.state.email,
				fullName: `${this.state.first_name} ${this.state.last_name}`,
				phoneNumber: this.state.phone,
				division: this.state.state,
				city: this.state.city,
				houseNo: this.state.address,
				postCode: this.state.postCode,
				payOption:this.state.payment,
				payMedium:this.state.payment_medium,
				message:"order",
				payPhnNumber:"01323131",
				transId:"afdwad",
			};
		} else {
			this.validator.showMessages();
			// rerender to show messages for the first time
			this.forceUpdate();
		}
	};
	StripeClick = () => {
		if (this.validator.allValid()) {
			alert("You submitted the form and stuff!");

			var handler = window.StripeCheckout.configure({
				key: "pk_test_glxk17KhP7poKIawsaSgKtsL",
				locale: "auto",
				token: (token: any) => {
					console.log(token);
					this.props.history.push({
						pathname: "/order-success",
						state: {
							payment: token,
							items: this.props.cartItems,
							orderTotal: this.props.total,
							symbol: this.props.symbol,
						},
					});
				},
			});
			handler.open({
				name: "Bay Of Style",
				description: "Online Fashion Store",
				amount: this.amount * 100,
			});
		} else {
			this.validator.showMessages();
			// rerender to show messages for the first time
			this.forceUpdate();
		}
	};

	render() {
		const { cartItems, symbol, total } = this.props;

		// Paypal Integration
		const onSuccess = (payment) => {
			console.log("The payment was succeeded!", payment);
			this.props.history.push({
				pathname: "/order-success",
				state: {
					payment: payment,
					items: cartItems,
					orderTotal: total,
					symbol: symbol,
				},
			});
		};

		const onCancel = (data) => {
			console.log("The payment was cancelled!", data);
		};

		const onError = (err) => {
			console.log("Error!", err);
		};

		const client = {
			sandbox:
				"AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_",
			production:
				"AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_",
		};

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
														"required|min:20|max:120"
													)}
												</div>
												<div className="form-group col-md-12 col-sm-12 col-xs-12">
													<div className="field-label">Town/City</div>
													<input
														type="text"
														name="city"
														value={this.state.city}
														onChange={this.setStateFromInput}
													/>
													{this.validator.message(
														"city",
														this.state.city,
														"required|alpha"
													)}
												</div>
												<div className="form-group col-md-12 col-sm-6 col-xs-12">
													<div className="field-label">State / Division</div>
													<input
														type="text"
														name="state"
														value={this.state.state}
														onChange={this.setStateFromInput}
													/>
													{this.validator.message(
														"state",
														this.state.state,
														"required|alpha"
													)}
												</div>
												<div className="form-group col-md-12 col-sm-6 col-xs-12">
													<div className="field-label">Postal Code</div>
													<input
														type="text"
														name="pincode"
														value={this.state.spincode}
														onChange={this.setStateFromInput}
													/>
													{this.validator.message(
														"pincode",
														this.state.pincode,
														"required|integer"
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
														{/* <li>
                              Shipping{" "}
                              <div className="shipping">
                                <div className="shopping-option">
                                  <input
                                    type="checkbox"
                                    name="free-shipping"
                                    id="free-shipping"
                                  />
                                  <label htmlFor="free-shipping">
                                    Free Shipping
                                  </label>
                                </div>
                                <div className="shopping-option">
                                  <input
                                    type="checkbox"
                                    name="local-pickup"
                                    id="local-pickup"
                                  />
                                  <label htmlFor="local-pickup">
                                    Local Pickup
                                  </label>
                                </div>
                              </div>
                            </li> */}
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
																				this.checkhandle("Cash On Delivery")
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
																				<strong> Bkash</strong>
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
																				<strong> Rocket</strong>
																			</button>
																		</div>

																		<div className="col-lg-4 text-center">
																			<button
																				className="btn w-75 rounded"
																				style={{
																					border:
																					this.state.payment_medium ===
																						"Nogod"
																							? "1px solid"
																							: "0px",
																				}}
																				onClick={(e) =>
																					this.handlePaymentOption(e, "Nogod")
																				}
																			>
																				<img
																					src={nogodImage}
																					alt=""
																					width="40px"
																				/>
																				<strong> Nogod</strong>
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
																	<div style={{margin:"20px 0px"}} className="text-center text-danger">
																		<strong>
																			Please send money to this number {this.state.payment_medium==='Bkash'?(this.state.payment_medium_bkash_number):this.state.payment_medium=='Nogod'?(this.state.payment_medium_nogod_number):(this.state.payment_medium_rocket_number)}
																		</strong>
																	</div>
																	<div className="form-group ">
																		<div className="field-label">
																			Your Payment Phone Number
																		</div>
																		<input
																			type="text"
																			name="payphone"
																			value={this.state.paymentPhoneNumber}
																			onChange={this.setStateFromInput}
																		/>
																	</div>
																	<div className="form-group ">
																		<div className="field-label">
																			Transaction Id
																		</div>

																		<input type="text" name="textId" />
																	</div>
																</div>
															) : (
																<div className="form-group">
																	<div className="field-label">
																		Please write a message
																	</div>
																	<textarea name="payment_message" id="" rows="10"></textarea>
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
});

export default connect(mapStateToProps, { removeFromWishlist })(checkOut);
