import React, { Component, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Order from "./userDashboard/orders";
import GeneralInfo from "./userDashboard/GeneralInfo";
import PreOrderForm from "./userDashboard/PreOrderForm";
import Modal from "react-responsive-modal";
import UpdateGeneralInfo from "./userDashboard/UpdateGeneralInfo";
import UpdatePassword from "./userDashboard/UpdatePassword";
import UpdateAddress from "./userDashboard/UpdateAddress";
import TrackPreOrder from "./userDashboard/TrackPreOrder";
import { getUserInfo } from "../../services/api/userApi";
const Dashboard = () => {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState([]);
	const [preOrderSuccess , setPreOrderSuccess] = useState(false)
	useEffect(async () => {
		try {
			setIsLoading(true);
			const resData = await getUserInfo();
			// console.log(resData.data.results[0].first_name);
			setUserData(resData.data.results[0])
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
		}
	}, []);
	const onOpenModal = () => {
		// this.setState({ open: true });
		setOpen(true);
	};
	const onCloseModal = () => {
		// this.setState({ open: false });
		setOpen(false);
	};

	return (
		<div>
			<Breadcrumb title={"Dashboard"} />
			{isLoading ? (
				<div>
					<div className="loading-cls"></div>
				</div>
			) : (
				<section className="section-b-space">
					<div className="container">
						<Tabs className="theme-tab">
							<div className="row">
								<div className="col-lg-3">
									<div className="account-sidebar">
										<a className="popup-btn">my account</a>
									</div>
									<div className="dashboard-left" style={{boxShadow:'0px 0px 17px 3px rgb(210 206 206 / 30%)'}}>
										<div className="collection-mobile-back">
											<span className="filter-back">
												<i className="fa fa-angle-left" aria-hidden="true"></i>{" "}
												back
											</span>
										</div>
										<div></div>
										<div className="block-content mx-auto">
											<div className="mx-auto">
												<button
													type="button"
													class="btn btn-danger pd-2 rounded  w-100"
													onClick={onOpenModal}
												>
													PreOrder
												</button>
											</div>
										</div>
										<div className="block-content">
											<TabList className="tabs tab-title">
												<Tab>DashBoard</Tab>
												<Tab>Orders</Tab>
												<Tab>Track PreOrders</Tab>
												<Tab>Update General Info</Tab>
												<Tab>Update Address</Tab>
												<Tab>Change Password</Tab>
											</TabList>
										</div>
									</div>
								</div>
								<div className="col-lg-9">
									<div className="dashboard-right" style={{boxShadow:'0px 0px 17px 3px rgb(210 206 206 / 30%)'}}>
										<div className="dashboard">
											<TabPanel>
												<GeneralInfo userData={userData} />
											</TabPanel>
											<TabPanel>
												<div className="no-slider row">
													<Order />
												</div>
											</TabPanel>
											<TabPanel>
												<TrackPreOrder  />
											</TabPanel>
											<TabPanel>
												<UpdateGeneralInfo  userData={userData}/>
											</TabPanel>
											<TabPanel>
												<UpdateAddress  userData={userData}/>
											</TabPanel>
											<TabPanel>
												<UpdatePassword />
											</TabPanel>
										</div>
									</div>
								</div>
							</div>
						</Tabs>
					</div>
				</section>
			)}
			{/*Dashboard section*/}

			<Modal open={open} onClose={onCloseModal} center>
				<div
					className="modal-dialog modal-lg modal-dialog-centered"
					role="document"
					style={{ width: "500vh" }}
				>
					<div className="modal-content ">
						<div className="modal-body">
							<div className="container">
								<div className="row">
									<div className="col-lg-12 ">
										<PreOrderForm onCloseModal={onCloseModal} setPreOrderSuccess={setPreOrderSuccess} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Dashboard;
