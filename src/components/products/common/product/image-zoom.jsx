import React, { Component } from "react";
import { urls } from "../../../../constants/urls.js";
import ImageMgnifier from "./ImageMagnifier.jsx";

export default class ImageZoom extends Component {
	render() {
		const { image } = this.props;

		console.log(image)
		return (
			// <img src={`https://dlgb.bayofstyle.com/uploads/${image}`}  className="img-fluid image_zoom_cls-0" />
			<ImageMgnifier
				// smallImage={`${urls.IMAGE_URL}${image}`}
				// largeImage={`${urls.IMAGE_URL}${image}`}
				smallImage={`https://dlgb.bayofstyle.com/uploads/${image}`}
				largeImage={`https://dlgb.bayofstyle.com/uploads/${image}`}
				style={{ height: "660px" }}
			/>
		);
	}
}
