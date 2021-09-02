import React, { Component } from "react";
import ImageMgnifier from "./ImageMagnifier.jsx";
import { defaultImage } from "../../../../constants/defaultImage";

export default class ImageZoom extends Component {
	render() {
		const { image } = this.props;

		return (
			// <img src={`https://dlgb.bayofstyle.com/uploads/${image}`}  className="img-fluid image_zoom_cls-0" />
			<ImageMgnifier
				smallImage={defaultImage}
				largeImage={defaultImage}
				style={{ height: "660px" }}
			/>
		);
	}
}
