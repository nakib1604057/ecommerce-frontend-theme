import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslate } from "react-redux-multilingual";
import { useSelector } from "react-redux";
import { isUserLoggedIn, removeLogOut } from "../../../../constants/utils";
import "./header.css";
function TopBar({ translate }) {
  const store = useSelector(store => store.companyInfo);
  const info = store.info.info;
  const logOut = () => {
    removeLogOut();
  };
  return (
    <div className="top-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="header-contact">
              <ul>
                <li>
                  {translate("topbar_title", { theme_name: " Notlens" })}
                </li>
                <li>
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  {translate("call_us")}:{" "}
                  {info !== undefined && info.contact_no}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <ul className="header-dropdown">
              {/* <li className="mobile-wishlist compare-mobile"><Link to={`/compare`}><i className="fa fa-random" aria-hidden="true"></i>{translate('compare')}</Link></li> */}
              <li className="mobile-wishlist">
                <Link to={`/wishlist`}>
                  <i className="fa fa-heart" aria-hidden="true"></i>
                  {translate("wishlist")}
                </Link>
              </li>
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i>{" "}
                {translate("my_account")}
                <ul className="onhover-show-div " id="accDropDown">
                  {isUserLoggedIn() ? (
                    <>
                      <li>
                        <a
                          href={`/user/dashboard`}
                          data-lng="en"
                          id="dorpdownItem"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a href={`/`} data-lng="en" onClick={() => logOut()}>
                          Logout
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <a href={`/pages/login`} data-lng="en">
                          Login
                        </a>
                      </li>
                      <li>
                        <a href={`/pages/register`} data-lng="en">
                          Register
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withTranslate(TopBar);
