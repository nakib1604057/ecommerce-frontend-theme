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
import "../../layouts/common/common.css";
import "./shop-products.css";
const Filter = () => {
	const [categories, setCategories] = useState([
		{
			name: "All",
			category_id: -1,
			categories: [
				{
					name: "All",
					category_id: -1,
				},
			],
		},
	]);
	const closeFilter = () => {
		// document.querySelector(".collection-filter").style = "left: -365px";
    document.querySelector(".collection-filter").classList.remove("mobile-shop-sidevar");
    document.querySelector(".collection-filter").classList.add("close-mobile-shop-sidevar");

	};
	const dispatch = useDispatch();
	const store = useSelector((state) => state.filters);
	const categoriesStore = useSelector((state) => state.categories);
	consoleLog(store);
	useEffect(() => {
		// if (categoriesStore.length === 1) {
		//   loadCategories();
		// } else {
		//   setCategories([...formatCategories(categoriesStore.category)]);
		// }
		loadCategories();
	}, []);

	const loadCategories = async () => {
		try {
			const res = await axiosInstance().get(urls.GET_CATEGORIES);

			setCategories([
				...categories,
				...formatCategories(res.data.data.categories),
			]);
		} catch (error) {
			consoleLog(error);
		}
	};
	const formatCategories = (categories) => {
		const parentCategories = [];

		categories.map((category) => {
			if (!category.parent_id) {
				const subCategories = categories.filter(
					(item) => category.category_id === item.parent_id
				);
				parentCategories.push({
					...category,
					categories: subCategories,
				});
			}
		});
		return parentCategories;
	};

	const clickBrandHendle = (event) => {
		consoleLog(event.target.value);
		dispatch(filterCategory(event.target.value));
	};
	return (
		<div className="collection-filter-block">
			{/*brand filter start*/}
			<div className="collection-mobile-back">
				<span className="filter-back" onClick={(e) => closeFilter(e)}>
					<i className="fa fa-angle-left" aria-hidden="true"></i> back
				</span>
			</div>
			{categories.map((category, index) => {
				return (
					<SlideToggle key={index}>
						{({ onToggle, setCollapsibleElement }) => {
							return (
								<div className="collection-collapse-block">
									<h3 className="collapse-block-title" onClick={onToggle}>
										{category.name}
									</h3>
									<div
										className="collection-collapse-block-content"
										ref={setCollapsibleElement}
									>
										<div className="collection-brand-filter">
											{category.categories &&
												category.categories.map((category, index) => {
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
																	store.categories ===
																	category.category_id.toString()
																		? true
																		: false
																}
																className="custom-control-input"
																id={category.name}
															/>
															<label
																className="custom-control-label "
																htmlFor={category.name}
															>
																<span className="product-name">
																	{category.name}{" "}
																</span>
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
				);
			})}
			{/*color filter start here*/}
		</div>
	);
};

export default Filter;
