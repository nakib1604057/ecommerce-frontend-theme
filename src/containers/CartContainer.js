import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CartPage from "../components/common/headers/common/cart-header";
import { removeFromCart } from "../actions";
import { getCartTotal } from "../services";

const CartContainer = ({ cartList, total, symbol, removeFromCart }) => (
	<li className="onhover-div mobile-cart">
		<div className="cart-qty-cls">{cartList.length}</div>
		<Link to={`/cart`}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="26"
				height="26"
				fill="currentColor"
				class="bi bi-cart3"
				viewBox="0 0 16 16"
			>
				<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
			</svg>
			<i className="fa fa-shopping-cart"></i>
		</Link>
		<ul
			className="show-div shopping-cart"
			style={{ boxShadow: "0px 0px 10px 3px rgb(193 187 187 / 30%)" }}
		>
			{cartList.map((item, index) => (
				<>
					<CartPage
						key={index}
						item={item}
						total={total}
						symbol={symbol}
						removeFromCart={() => removeFromCart(item)}
					/>
					<hr />
				</>
			))}
			{cartList.length > 0 ? (
				<div>
					<li>
						<div className="total">
							<h5>
								subtotal :{" "}
								<span>
									{symbol}
									{total}
								</span>
							</h5>
						</div>
					</li>
					<li>
						<div className="buttons">
							<Link to={`/cart`} className="view-cart">
								view cart
							</Link>
							<Link to={`/checkout`} className="checkout">
								checkout
							</Link>
						</div>
					</li>
				</div>
			) : (
				<li>
					<h5>Your cart is currently empty.</h5>
				</li>
			)}
		</ul>
	</li>
);

function mapStateToProps(state) {
	return {
		cartList: state.cartList.cart,
		total: getCartTotal(state.cartList.cart),
		symbol: state.data.symbol,
	};
}

export default connect(mapStateToProps, { removeFromCart })(CartContainer);
