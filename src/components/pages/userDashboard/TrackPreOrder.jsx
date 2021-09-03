import React,{useEffect,useState} from "react";
import {Link }from "react-router-dom"
import { ApipandingPreOrders } from "../../../services/api/userApi";
const TrackPreOrder = () => {
	const [pendingPreOrder, setPendingPreOrder] = useState([]);

	useEffect(async()=>{
		await fetchPandingPreOrder();

	},[])
	const fetchPandingPreOrder = async () => {
		const preOrder = await ApipandingPreOrders();
		setPendingPreOrder(preOrder.data.pandingPreOrders);
	};
	return <div>
		<h3>Your Orders</h3>
		<table className="table cart-table table-responsive-xs">
	<thead>
		<tr className="table-head">
			<th scope="col">Order Id</th>
			<th scope="col">product name</th>
			{/* <th scope="col">price</th> */}
			<th scope="col">quantity</th>
			<th scope="col">Status</th>
			<th scope="col">time</th>
		</tr>
	</thead>
	{pendingPreOrder.map((item, index) => {
		// console.log(item.price);
		return (
			<tbody>
				<tr>
					<td>#{item.id}</td>
					<td>
						<Link
						// to={`/product/${item.slug}`}
						>
							{item.product_name}
						</Link>
					</td>
					{/* <td>{item.price}</td> */}
					<td>{item.qty}</td>
					<td><span class="badge badge-info">{item.status}</span></td>
					<td>{item.order_date.replace(/T/, " ").replace(/\..+/, "")}</td>
				</tr>
			</tbody>
		);
	})}
</table></div>;
};

export default TrackPreOrder;
