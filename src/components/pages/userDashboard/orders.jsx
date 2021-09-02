import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { pandingOrders } from "../../../services/api/ecommerce";
const main = () => {
	const [orderDettails, setOrderDeatils] = useState(false);
	const [orderedItems, setOrderedItems] = useState([]);
	useEffect(async () => {
		await fetchPandingOrders();
	}, []);
	const fetchPandingOrders = async () => {
		const res = await pandingOrders();
		setOrderedItems(res.data.allOrders);
	};
	console.log(orderedItems);
	return (
		<table className="table cart-table table-responsive-xs">
			<thead>
				<tr className="table-head">
					<th scope="col">Order Id</th>
					<th scope="col">product name</th>
					<th scope="col">price</th>
					<th scope="col">quantity</th>
					<th scope="col">Status</th>
					<th scope="col">time</th>
				</tr>
			</thead>
			{orderedItems.map((item, index) => {
				console.log(item.price);
				return (
					<tbody>
						<tr>
							<td>#12313</td>
							<td>
								<Link
								// to={`${process.env.PUBLIC_URL}/product/${item.slug}`}
								>
									{item.product_name}
								</Link>
							</td>
							<td>{item.price}</td>
							<td>{item.qty}</td>
							<td><span class="badge badge-info">{item.status}</span></td>
							<td>{item.order_date.replace(/T/, " ").replace(/\..+/, "")}</td>
						</tr>
					</tbody>
				);
			})}
		</table>
	);
};

export default main;
