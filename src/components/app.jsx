import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";
// Custom Components
import HeaderOne from "./common/headers/header-one";
import HeaderTwo from "./common/headers/header-two";
import HeaderThree from "./common/headers/header-three";

import FooterOne from "./common/footers/footer-one";
import FooterTwo from "./common/footers/footer-two";
import FooterThree from "./common/footers/footer-three";
import "./mobilefixedBtmNav.scss";
import { Link } from "react-router-dom";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showBtmNav: false,
		};
	}
	componentDidMount() {
		window.addEventListener("resize", this.resize.bind(this));
		this.resize();
	}

	resize() {
		let ismobileView = window.innerWidth <= 578;
		if (ismobileView) {
			this.setState({
				showBtmNav: true,
			});
		} else {
			this.setState({
				showBtmNav: false,
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.resize.bind(this));
	}
	render() {
		return (
			<div>
				<HeaderOne logoName={"logo.png"} />
				{this.props.children}
				<FooterOne logoName={"logo.png"} />
				{this.state.showBtmNav ? (
					<nav class="mobile-bottom-nav ">
						<div class="mobile-bottom-nav__item mobile-bottom-nav__item--active">
							<div class="mobile-bottom-nav__item-content text-center">
								{/* <i class="material-icons">home</i> */}
								<Link to="/">
									<div className="m-auto mb-0">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor"
											class="bi bi-house-door"
											viewBox="0 0 16 16"
										>
											<path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
										</svg>
									</div>
									Home
								</Link>
							</div>
						</div>
						<div class="mobile-bottom-nav__item">
							<div class="mobile-bottom-nav__item-content">
								<Link to="/cart">
									<div className="m-auto mb-0">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor"
											class="bi bi-basket"
											viewBox="0 0 16 16"
										>
											<path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
										</svg>
									</div>
									Cart
								</Link>
							</div>
						</div>
						<div class="mobile-bottom-nav__item">
							<div class="mobile-bottom-nav__item-content">
								<Link to="/wishlist">
									<div className="m-auto mb-0">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor"
											class="bi bi-suit-heart"
											viewBox="0 0 16 16"
										>
											<path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
										</svg>
									</div>
									Wishlist
								</Link>
							</div>
						</div>

						<div class="mobile-bottom-nav__item">
							<div class="mobile-bottom-nav__item-content">
								<Link to="/pages/dashboard">
									<div className="m-auto mb-0">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="23"
											height="23"
											fill="currentColor"
											class="bi bi-person"
											viewBox="0 0 16 16"
										>
											<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
										</svg>
									</div>
									Account
								</Link>
							</div>
						</div>
						<div class="mobile-bottom-nav__item">
							<div class="mobile-bottom-nav__item-content">
								<div className="m-auto mb-0">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="currentColor"
										class="bi bi-search"
										viewBox="0 0 16 16"
									>
										<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
									</svg>
								</div>
								Search
							</div>
						</div>
					</nav>
				) : null}

				{/* <ThemeSettings /> */}
			</div>
		);
	}
}

export default withTranslate(App);
