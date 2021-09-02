import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const GeneralInfo = ({ userData }) => {
	console.log("userDaa", userData);
	const empty = ()=>(<span className="text-danger">empty</span>)
	return (
		<div>
			<div className="page-title">
				<h2>
					Hello, {userData.first_name} {userData.last_name} !
				</h2>
			</div>
			<div className="welcome-msg">
				<p>
					From your My Account Dashboard you have the ability to view a snapshot
					of your recent account activity and update your account information.
					Select a link below to view or edit information.
				</p>
			</div>
			<div className="box-account box-info">
				<div className="box-head">
					<h2>Account Information</h2>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<div className="box">
							<div className="box-title">
								<h3>General Information</h3>
								<a href="#">Edit</a>
							</div>
							<div className="box-content">
								<h5>
									{" "}
									<strong>UserName: </strong>
									{userData.user_name}{" "}
								</h5>
								<h5>
									<strong>Phone Number: </strong> {userData.phone_number}
								</h5>

								{/* <h6>
									<Link to="#">Change Password</Link>
								</h6> */}
							</div>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="box">
							<div className="box-title">
								<h3>Newsletters</h3>
								<a href="#">Edit</a>
							</div>
							<div className="box-content">
								<p>You are currently not subscribed to any newsletter.</p>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="box">
						<div className="box-title">
							<h3>Address Book</h3>
							{/* <Link h="#">Manage Addresses</a> */}
						</div>
						<div className="row">
							<div className="col-sm-6">
								
								<address>
									<h5>
										<strong>Country: </strong>
										{userData.country?userData.country:(empty())}
									</h5>
									<h5>
										<strong>Division: </strong> {userData.division?userData.division:(empty())}
									</h5>

									<h5>
										<strong>City/Town: </strong> {userData.city?userData.city:(empty())}
									</h5>

									<br />
									{/* <a href="#">Edit Address</a> */}
								</address>
							</div>
							<div className="col-sm-6">
								
								<address>
									<h5>
										
										<strong>House No: </strong>
										{userData.houseNo?userData.houseNo:(empty())}
									</h5>
									<h5>
										<strong>Landmark: </strong> {userData.landmark?userData.landmark:(empty())}
									</h5>

									<h5>
										
										<strong>Post Code: </strong> {userData.postCode?userData.postCode:(empty())}
									</h5>
									<br />
									{/* <a href="#">Edit Address</a> */}
								</address>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GeneralInfo;
