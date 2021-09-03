import React, { Component } from "react";
import ImageMgnifier from "./ImageMagnifier.jsx";

export default class ImageZoom extends Component {
	render() {
		const { image } = this.props;

		return (
			// <img src={`https://dlgb.bayofstyle.com/uploads/${image}`}  className="img-fluid image_zoom_cls-0" />
			<ImageMgnifier
				smallImage={`https://dlgb.bayofstyle.com/uploads/${image}`}
				largeImage={`https://dlgb.bayofstyle.com/uploads/${image}`}
				// style={{ height: "660px" }}
			/>
		);
	}
}
