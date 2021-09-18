import React, { Component } from "react";
import store from "../../../../store";
import { filterCategory } from "../../../../actions";
import { Link, withRouter } from "react-router-dom";
import { withTranslate } from "react-redux-multilingual";
import { getCategories } from "../../../../services/api/ecommerce";
class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navClose: { right: "0px" },
      categories: [],
    };
  }

  componentWillMount() {
    if (window.innerWidth < 750) {
      this.setState({ navClose: { right: "-410px" } });
    }
    if (window.innerWidth < 1199) {
      this.setState({ navClose: { right: "-300px" } });
    }
    const categoryData = getCategories();
    categoryData.then(res => {
      // console.log("cat", res);
      this.setState({
        categories: res.data.data.categories,
      });
    });
  }

  openNav() {
    this.setState({ navClose: { right: "0px" } });
  }
  closeNav() {
    this.setState({ navClose: { right: "-410px" } });
  }

  onMouseEnterHandler() {
    if (window.innerWidth > 1199) {
      document.querySelector("#main-menu").classList.add("hover-unset");
    }
  }

  handleSubmenu = event => {
    if (event.target.classList.contains("sub-arrow")) return;

		if (event.target.nextElementSibling.classList.contains("opensubmenu"))
			event.target.nextElementSibling.classList.remove("opensubmenu");
		else {
			document.querySelectorAll(".nav-submenu").forEach(function(value) {
				value.classList.remove("opensubmenu");
			});
			document
				.querySelector(".mega-menu-container")
				.classList.remove("opensubmenu");
			event.target.nextElementSibling.classList.add("opensubmenu");
		}
	};
	handleCategoryClick = (e, categoryId) => {
		e.preventDefault();
		store.dispatch(filterCategory(categoryId));
		// this.props.history.push('/');
	};
	handleMegaSubmenu = (event) => {
		if (event.target.classList.contains("sub-arrow")) return;
		// if (
		// 	event.target.parentNode.nextElementSibling.classList.contains(
		// 		"opensubmegamenu"
		// 	)
		// )
		// 	event.target.parentNode.nextElementSibling.classList.remove(
		// 		"opensubmegamenu"
		// 	);
		else {
			document.querySelectorAll(".menu-content").forEach(function(value) {
				value.classList.remove("opensubmegamenu");
			});
			event.target.parentNode.nextElementSibling.classList.add(
				"opensubmegamenu"
			);
		}
	};

	render() {
		const { translate } = this.props;
		return (
			<div>
				<div className="main-navbar">
					<div id="mainnav">
						<div className="toggle-nav" onClick={this.openNav.bind(this)}>
							<i className="fa fa-bars sidebar-bar"></i>
						</div>
						<ul className="nav-menu" style={this.state.navClose}>
							<li className="back-btn" onClick={this.closeNav.bind(this)}>
								<div className="mobile-back text-right">
									<span>Back</span>
									<i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
								</div>
							</li>
							<li>
								<Link
									to="/"
									className="nav-link"
									// onClick={(e) => this.handleSubmenu(e)}
								>
									{translate("home")}
									{/* <span className="sub-arrow"></span> */}
								</Link>
								{/* <ul className="nav-submenu" >
                                    <li><Link to={`/fashion`} >{translate('fashion')}</Link></li>
                                    <li><Link to={`/beauty`} >{translate('beauty')}</Link></li>
                                    <li><Link to={`/electronic`} >{translate('electronic')}</Link></li>
                                    <li><Link to={`/furniture`} >{translate('furniture')}</Link></li>
                                    <li><Link to={`/kids`} >{translate('kids')}</Link></li>
                                    <li><Link to={`/pets`} >{translate('pets')}</Link></li>
                                    <li><Link to={`/vegetables`} >{translate('vegetables')}</Link></li>
                                    <li><Link to={`/watch`} >{translate('watch')}</Link></li>
                                </ul> */}
							</li>
							<li >
								<Link
									to="/shop"
									className="nav-link"
									onClick={(e) => this.handleSubmenu(e)}
								>
									{translate("shop")}
									<span className="sub-arrow"></span>
								</Link>
								<ul className="nav-submenu">
									<li>
										<Link to={`/left-sidebar/collection`}>
											{translate("category_left_sidebar")}
										</Link>
									</li>
									<li>
										<Link to={`/right-sidebar/collection`}>
											{translate("category_right_sidebar")}
										</Link>
									</li>
									<li>
										<Link to={`/no-sidebar/collection`}>
											{translate("category_no_sidebar")}
										</Link>
									</li>
									<li  className="subCategory">
										<Link to="#" onClick={(e) => this.handleSubmenu(e)}>
											{translate("category_metro")}
											<span className="sub-arrow"></span>
										</Link>
										<ul>
											<li>
												<Link to={`/metro/collection`}>new</Link>
											</li>
											<li>
												<Link to={`/metro/collection`}>First Product</Link>
											</li>
										</ul>
									</li>

									<li>
										<Link to={`/full-width/collection`}>
											{translate("category_full_width")}
										</Link>
									</li>
								</ul>
							</li>

							<li>
								<Link
									to="#"
									className="nav-link"
									onClick={(e) => this.handleSubmenu(e)}
								>
									{/* {translate('products')} */}
									Category
									<span className="sub-arrow"></span>
								</Link>
								<ul className="nav-submenu">
									{this.state.categories.map((item) => (
										<li key={item.category_id}>
											<Link
												to={`${process.env.PUBLIC_URL}/shop`}
												onClick={(e) =>
													this.handleCategoryClick(e, item.category_id)
												}
											>
												{item.name}
											</Link>
										</li>
									))}
									{/* <li><Link to={`/right-sidebar/product/1`} >{translate('right_sidebar')}</Link></li>
                                    <li><Link to={`/no-sidebar/product/1`} >{translate('no_sidebar')}</Link></li>
                                    <li><Link to={`/col-left/product/1`} >{translate('three_col_thumbnail_left')}</Link></li>
                                    <li><Link to={`/col-right/product/1`} >{translate('three_col_thumbnail_right')}</Link></li>
                                    <li><Link to={`/column/product/1`} >{translate('thumbnail_below')}</Link></li>
                                    <li><Link to={`/left-image/product/1`} >{translate('thumbnail_left')}</Link></li>
                                    <li><Link to={`/right-image/product/1`} >{translate('thumbnail_right')}</Link></li> */}
								</ul>
							</li>
							<li className="mega-menu">
								<div className="mega-menu-container"></div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(withTranslate(NavBar));
