import React, { Component, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { consoleLog } from "../../../console";
import { ADD_INFO } from "../../../constants/ActionTypes";
import { urls } from "../../../constants/urls";

import { SlideUpDown } from "../../../services/script";
import LogoImage from "../headers/common/logo";

const FooterOne = props => {
  const dispatch = useDispatch();
  const store = useSelector(store => store.companyInfo);
  const info = store.info.info;
  useEffect(() => {
    var contentwidth = window.innerWidth;
    if (contentwidth < 750) {
      SlideUpDown("footer-title");
    } else {
      var elems = document.querySelectorAll(".footer-title");
      [].forEach.call(elems, function(elemt) {
        let el = elemt.nextElementSibling;
        el.style = "display: block";
      });
    }
    if (store.info.length === 0) {
      loadInfo();
    }
  }, []);

  const loadInfo = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_INFO);
      // res.data.results
      dispatch({ type: ADD_INFO, data: res.data.results });
    } catch (error) {}
  };
  consoleLog(info);
  return (
    <footer className="footer-light">
      <div className="light-layout">
        <div className="container">
          <section className="small-section border-section border-top-0">
            <div className="row">
              <div className="col-lg-6">
                <div className="subscribe">
                  <div>
                    <h4>KNOW IT ALL FIRST!</h4>
                    <p>
                      Never Miss Anything From Bay Of Style By Signing Up To Our
                      Newsletter.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <form className="form-inline subscribe-form">
                  <div className="form-group mx-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter your email"
                    />
                  </div>
                  <button type="submit" className="btn btn-solid">
                    subscribe
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
      <section className="section-b-space light-layout">
        <div className="container">
          <div className="row footer-theme partition-f">
            <div className="col-lg-4 col-md-6">
              <div className="footer-title footer-mobile-title">
                <h4>about</h4>
              </div>
              <div className="footer-contant">
                <div className="footer-logo">
                  <LogoImage logo={props.logoName} />
                </div>
                <p>{info !== undefined && info.about_us}</p>
                {/* <div className="footer-social">
                  <ul>
                    <li>
                      <Link to={"https://www.facebook.com/"}>
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={"https://plus.google.com/"}>
                        <i className="fa fa-google-plus" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={"https://twitter.com"}>
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={"https://instagram.com"}>
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={"https://rss.com/"}>
                        <i className="fa fa-rss" aria-hidden="true"></i>
                      </Link>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
            <div className="col offset-xl-1">
              <div className="sub-title">
                {/* <div className="footer-title">
									<h4>my account</h4>
								</div>
								<div className="footer-contant">
									<ul>
										<li>
											<Link
												to={`/left-sidebar/collection`}
											>
												womens
											</Link>
										</li>
										<li>
											<Link
												to={`/left-sidebar/collection`}
											>
												clothing
											</Link>
										</li>
										<li>
											<Link
												to={`/left-sidebar/collection`}
											>
												accessories
											</Link>
										</li>
										<li>
											<Link
												to={`/left-sidebar/collection`}
											>
												featured
											</Link>
										</li>
									</ul>
								</div> */}
              </div>
            </div>
            <div className="col">
              <div className="sub-title">
                <div className="footer-title">
                  <h4>why we choose</h4>
                </div>
                <div className="footer-contant">
                  <ul>
                    <li>
                      <a href="#">shipping & return</a>
                    </li>
                    <li>
                      <a href="#">secure shopping</a>
                    </li>
                    <li>
                      <a href="#">gallary</a>
                    </li>
                    <li>
                      <a href="#">affiliates</a>
                    </li>
                    <li>
                      <a href="#">contacts</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="sub-title">
                <div className="footer-title">
                  <h4>store information</h4>
                </div>
                <div className="footer-contant">
                  <ul className="contact-list">
                    <li>
                      <i className="fa fa-map-marker"></i>
                      {info !== undefined && info.address}
                    </li>
                    <li>
                      <i className="fa fa-phone"></i>Call Us:{" "}
                      {info !== undefined && info.contact_no}
                    </li>
                    <li>
                      <i className="fa fa-envelope-o"></i>Email Us:{" "}
                      <a href="#">{info !== undefined && info.email}</a>
                    </li>
                    <li>
                      <i className="fa fa-fax"></i>Schedule:{" "}
                      {info !== undefined && info.schedule}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="sub-footer ">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-md-6 col-sm-12">
              <div className="footer-end">
                <p>
                  <i className="fa fa-copyright" aria-hidden="true"></i>powered
                  by Diligite
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-md-6 col-sm-12"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;
