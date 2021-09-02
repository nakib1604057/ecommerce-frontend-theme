import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { SlideToggle } from "react-slide-toggle";

import { getBrands, getColors, getMinMaxPrice } from "../../../services";
import {
  filterBrand,
  filterCategory,
  filterColor,
  filterPrice,
} from "../../../actions";
import { consoleLog } from "../../../console";
import axiosInstance from "../../../api/axiosInstance";
import { urls } from "../../../constants/urls";

const Filter = () => {
  const [categories, setCategories] = useState([
    { name: "All", category_id: -1 },
  ]);

  const dispatch = useDispatch();
  const store = useSelector(state => state.filters);
  const categoriesStore = useSelector(state => state.categories);
  consoleLog(store);
  useEffect(() => {
    if (categoriesStore.length === 1) {
      loadCategories();
    } else {
      setCategories([...categoriesStore.category]);
    }
  }, []);
  const loadCategories = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_CATEGORIES);
      setCategories([...categories, ...res.data.data.categories]);
    } catch (error) {
      consoleLog(error);
    }
  };

  const clickBrandHendle = event => {
    consoleLog(event.target.value);
    dispatch(filterCategory(event.target.value));
  };

  return (
    <div className="collection-filter-block">
      {/*brand filter start*/}
      <div className="collection-mobile-back">
        <span className="filter-back" onClick={e => this.closeFilter(e)}>
          <i className="fa fa-angle-left" aria-hidden="true"></i> back
        </span>
      </div>
      <SlideToggle>
        {({ onToggle, setCollapsibleElement }) => {
          return (
            <div className="collection-collapse-block">
              <h3 className="collapse-block-title" onClick={onToggle}>
                Category
              </h3>
              <div
                className="collection-collapse-block-content"
                ref={setCollapsibleElement}
              >
                <div className="collection-brand-filter">
                  {categories.map((category, index) => {
                    return (
                      <div
                        className="custom-control custom-checkbox collection-filter-checkbox"
                        key={index}
                      >
                        <input
                          type="checkbox"
                          onClick={clickBrandHendle}
                          value={category.category_id.toString()}
                          // defaultChecked={

                          // }
                          checked={
                            store.categories === category.category_id.toString()
                              ? true
                              : false
                          }
                          className="custom-control-input"
                          id={category.name}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={category.name}
                        >
                          {category.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }}
      </SlideToggle>

      {/*color filter start here*/}
    </div>
  );
};

export default Filter;
