import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { IntlActions } from "react-redux-multilingual";
import Pace from "react-pace-progress";

// Import custom components
import store from "../../../store";
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import CartContainer from "./../../../containers/CartContainer";
import TopBar from "./common/topbar";
import LogoImage from "./common/logo";
import { changeCurrency } from "../../../actions";
import { connect } from "react-redux";

class HeaderOne extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
		};
	}
	/*=====================
         Pre loader
         ==========================*/
	componentDidMount() {
		setTimeout(function() {
			document.querySelector(".loader-wrapper").style = "display: none";
		}, 2000);

		this.setState({ open: true });
	}

	componentWillMount() {
		window.addEventListener("scroll", this.handleScroll);
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	handleScroll = () => {
		let number =
			window.pageXOffset ||
			document.documentElement.scrollTop ||
			document.body.scrollTop ||
			0;
		if (number >= 300) {
			if (window.innerWidth < 576) {
				document.getElementById("sticky").classList.remove("fixed");
			} else document.getElementById("sticky").classList.add("fixed");
		} else {
			document.getElementById("sticky").classList.remove("fixed");
		}
	};

	changeLanguage(lang) {
		store.dispatch(IntlActions.setLocale(lang));
	}

	openNav() {
		var openmyslide = document.getElementById("mySidenav");
		if (openmyslide) {
			openmyslide.classList.add("open-side");
		}
	}
	openSearch() {
		document.getElementById("search-overlay").style.display = "block";
	}

	closeSearch() {
		document.getElementById("search-overlay").style.display = "none";
	}

	load = () => {
		this.setState({ isLoading: true });
		fetch().then(() => {
			// deal with data fetched
			this.setState({ isLoading: false });
		});
	};

	render() {
		return (
			<div>
				<header id="sticky" className="sticky">
					{this.state.isLoading ? <Pace color="#27ae60" /> : null}
					<div className="mobile-fix-option"></div>
					{/*Top Header Component*/}
					<TopBar />
					<div className="headerOneMainMenu">
						<div className="container">
							<div className="row">
								<div className="col-sm-12">
									<div className="main-menu">
										<div className="menu-left">
											{/* <div className="navbar">
											<a href="javascript:void(0)" onClick={this.openNav}>
												<div className="bar-style"> <i className="fa fa-bars sidebar-bar" aria-hidden="true"></i></div>
											</a> */}
											{/* SideBar Navigation Component */}
											{/* <SideBar/> */}
											{/* </div> */}
											<div className="brand-logo" style={{ padding: "0px" }}>
												<LogoImage logo={this.props.logoName} />
											</div>
										</div>
										<div className="menu-right pull-right">
											{/*Top Navigation Bar Component*/}
											<NavBar />

											<div>
												<div className="icon-nav">
													<ul>
														<li className="onhover-div mobile-search">
															<div>
																{/* <img src={`/assets/images/icon/search.png`} onClick={this.openSearch} className="img-fluid" alt="" /> */}
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="24"
																	height="24"
																	fill="currentColor"
																	class="bi bi-search"
																	viewBox="0 0 16 16"
																	onClick={this.openSearch}
																>
																	<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
																</svg>
																<i
																	className="fa fa-search"
																	onClick={this.openSearch}
																></i>
															</div>
														</li>
														{/* <li className="onhover-div mobile-setting">
														<div><img src={`/shop`} className="img-fluid" alt="" />
															<i className="fa fa-cog"></i>
															<i className="fa fa-shopify"></i>
															</div>
												
													</li> */}
														{/*Header Cart Component */}
														<CartContainer />
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>

				<div id="search-overlay" className="search-overlay">
					<div>
						<span
							className="closebtn"
							onClick={this.closeSearch}
							title="Close Overlay"
						>
							×
						</span>
						<div className="overlay-content">
							<div className="container">
								<div className="row">
									<div className="col-xl-12">
										<form>
											<div className="form-group">
												<input
													type="text"
													className="form-control"
													id="exampleInputPassword1"
													placeholder="Search a Product"
												/>
											</div>
											<button type="submit" className="btn btn-primary">
												<i className="fa fa-search"></i>
											</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, { changeCurrency })(HeaderOne);
