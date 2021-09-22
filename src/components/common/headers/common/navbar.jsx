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
        categories: this.formatCategories(res.data.data.categories),
      });
    });
  }

  formatCategories = categories => {
    const parentCategories = [];

    categories.map(category => {
      if (!category.parent_id) {
        const subCategories = categories.filter(
          item => category.category_id === item.parent_id
        );
        parentCategories.push({
          ...category,
          categories: subCategories,
        });
      }
    });
    return parentCategories;
  };

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
  handleMegaSubmenu = event => {
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
              </li>
              <li>
                <a
                  href="/shop"
                  className="nav-link"
                  // onClick={(e) => this.handleSubmenu(e)}
                >
                  {translate("shop")}
                  {/* <span className="sub-arrow"></span> */}
                </a>
              </li>

              {/* <> */}
                {/* <Link */}
{/* to="#"
 className="nav-link"
 onClick={e => this.handleSubmenu(e)}
                > */}
                  {/* {translate('products')} */}
                  {/* Category */}
                  {/* <span className="sub-arrow"></span> */}
                {/* </Link> */}
                {/* <ul className="nav-submenu">
                  {this.state.categories.map(item => (
                    <li key={item.category_id} className="subCategory">
                      <a>
                        {item.name}
                        {item.categories.length > 0 && (
                          <span className="sub-arrow"></span>
                        )}
                      </a>
                      {item.categories.length > 0 &&
                        item.categories.map(sub_cat => (
                          <ul>
                            <li>
                              <a href={`/shop`}  onClick={e => this.handleCategoryClick(e,sub_cat.category_id)}>{sub_cat.name}</a>
                            </li>
                          </ul>
                        ))}
                    </li>
                  ))}
                </ul> */}
              {/* </li> */}
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
