import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const GeneralInfo = ({ userData }) => {
	const empty = () => <span className="text-danger">empty</span>;
	return (
		<div>
			<div className="page-title">
				<h2>
					Hello, {userData.first_name} {userData.last_name} !
				</h2>
			</div>
			<div className="welcome-msg">
				<p>
					Wellcome to <strong>Notlens .</strong>
				</p>
			</div>
			<div className="box-account box-info">
				<div className="box-head">
					<h2>Account Information</h2>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="box">
							<div className="box-title">
								<h3>General Information</h3>
							</div>
							<div className="row">
								<div className="col-6">
									<div className="box-content">
										<h5>
											<strong>First Name: </strong>
											{userData.first_name?userData.first_name:(empty())}{" "}
										</h5>
										<h5>
											<strong>Last Name: </strong> {userData.last_name?userData.last_name:(empty())}
										</h5>
									</div>
								</div>
								<div className="col-6">
									<div className="box-content">
										<h5>
											<strong>UserName: </strong>
											{userData.user_name?userData.user_name:(empty())}{" "}
										</h5>
										<h5>
											<strong>Phone Number: </strong> {userData.phone_number?userData.phone_number:(empty())}
										</h5>
									</div>
								</div>
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
										{userData.country ? userData.country : empty()}
									</h5>
									<h5>
										<strong>Division: </strong>{" "}
										{userData.division ? userData.division : empty()}
									</h5>

									

									<br />
									{/* <a href="#">Edit Address</a> */}
								</address>
							</div>
							<div className="col-sm-6">
								<address>
								<h5>
										<strong>City/Town: </strong>{" "}
										{userData.city ? userData.city : empty()}
									</h5>
									<h5>
										<strong>Address: </strong>{" "}
										{userData.address ? userData.address : empty()}
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
