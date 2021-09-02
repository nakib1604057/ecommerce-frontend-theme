import React from "react";

const GeneralInfo = () => {
	return (
		<div>
			<div className="page-title">
				<h2>My Dashboard</h2>
			</div>
			<div className="welcome-msg">
				<p>Hello, MARK JECNO !</p>
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
								<h3>Contact Information</h3>
								<a href="#">Edit</a>
							</div>
							<div className="box-content">
								<h6>MARK JECNO</h6>
								<h6>MARk-JECNO@gmail.com</h6>
								<h6>
									<a href="#">Change Password</a>
								</h6>
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
							<a href="#">Manage Addresses</a>
						</div>
						<div className="row">
							<div className="col-sm-6">
								<h6>Default Billing Address</h6>
								<address>
									You have not set a default billing address.
									<br />
									<a href="#">Edit Address</a>
								</address>
							</div>
							<div className="col-sm-6">
								<h6>Default Shipping Address</h6>
								<address>
									You have not set a default shipping address.
									<br />
									<a href="#">Edit Address</a>
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
