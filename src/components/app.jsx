import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";
// Custom Components
import HeaderOne from "./common/headers/header-one";
import HeaderTwo from "./common/headers/header-two";
import HeaderThree from "./common/headers/header-three";
import MobileFIxedBtmNav from "./mobileFIxedBtmNav";
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
					 <MobileFIxedBtmNav />
				) : null}

				{/* <ThemeSettings /> */}
			</div>
		);
	}
}

export default withTranslate(App);
