import React from "react";
import {
	
	SideBySideMagnifier,

} from "react-image-magnifiers";
const Imagemagnifier = ({smallImage, largeImage}) => {
	return (
		<div>
			<SideBySideMagnifier
				imageSrc={smallImage}
				// imageAlt="Product A"
				largeImageSrc={largeImage}
				// fillAvailableSpace="false"
				alwaysInPlace={true}
				// zoomPosition="left"
				inPlaceMinBreakpoint={440}
			
			/>
		</div>
	);
};

export default Imagemagnifier;
