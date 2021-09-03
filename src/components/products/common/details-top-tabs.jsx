import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import { Link } from "react-router-dom";
import Reviews from "./product/reviews";
import PostReview from "./product/post-review";

class DetailsTopTabs extends Component {
  render() {
    return (
      <section className="tab-product m-0">
        <div className="row">
          <div className="col-sm-12 col-lg-12">
            <Tabs className="tab-content nav-material">
              <TabList className="nav nav-tabs nav-material">
                <Tab className="nav-item">
                  <span className="nav-link active">
                    <i className="icofont icofont-ui-home"></i>Description
                  </span>
                  <div className="material-border"></div>
                </Tab>

                <Tab className="nav-item">
                  <span className="nav-link">
                    <i className="icofont icofont-contacts"></i>Reviews
                  </span>
                  <div className="material-border"></div>
                </Tab>
              </TabList>
              <TabPanel className="tab-pane fade mt-4 show active">
                <p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.props.item.longDescription,
                    }}
                  ></div>
                </p>
              </TabPanel>
              <TabPanel>
                <form className="theme-form mt-4">
                  <div className="form-row">
                    <Reviews id={this.props.item.id}/>
                    <PostReview id={this.props.item.id}/>
                  </div>
                </form>
              </TabPanel>

              <TabPanel></TabPanel>
            </Tabs>
          </div>
        </div>
      </section>
    );
  }
}

export default DetailsTopTabs;
