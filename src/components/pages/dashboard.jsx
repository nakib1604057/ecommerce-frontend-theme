import React, { Component } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Order from "./userDashboard/orders";
import GeneralInfo from "./userDashboard/GeneralInfo";
import PreOrderForm from "./userDashboard/PreOrderForm";
import Modal from "react-responsive-modal";

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
	}

	onOpenModal = () => {
		this.setState({ open: true });
	};
	onCloseModal = () => {
		this.setState({ open: false });
	};

	render() {
		return (
			<div>
				<Breadcrumb title={"Dashboard"} />

				{/*Dashboard section*/}
				<section className="section-b-space">
					<div className="container">
						<Tabs className="theme-tab">
							<div className="row">
								<div className="col-lg-3">
									<div className="account-sidebar">
										<a className="popup-btn">my account</a>
									</div>
									<div className="dashboard-left">
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
													onClick={this.onOpenModal}
												>
													PreOrder
												</button>
											</div>
										</div>
										<div className="block-content">
											<TabList className="tabs tab-title">
												<Tab>My DashBoard</Tab>
												<Tab>Orders</Tab>
												<Tab>Mens Wear</Tab>
												<Tab>Womens Wear</Tab>
											</TabList>
										</div>
									</div>
								</div>
								<div className="col-lg-9">
									<div className="dashboard-right">
										<div className="dashboard">
											<TabPanel>
												<GeneralInfo />
											</TabPanel>
											<TabPanel>
												<div className="no-slider row">
													<Order></Order>
												</div>
											</TabPanel>
										</div>
									</div>
								</div>
							</div>
						</Tabs>
					</div>
				</section>
				<Modal open={this.state.open} onClose={this.onCloseModal} center>
					<div
						className="modal-dialog modal-lg modal-dialog-centered"
						role="document"
						style={{width:'500vh'}}
					>
						<div className="modal-content ">
							<div className="modal-body">
								<div className="container">
									<div className="row">
										<div className="col-lg-12 ">
											<PreOrderForm  onCloseModal={this.onCloseModal}/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

export default Dashboard;
