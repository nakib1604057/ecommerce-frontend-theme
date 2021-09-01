import React from "react";
import BlogSection from "../common/blogsection";

const main = () => {
	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="title1 section-t-space">
							<h4>Recent Story</h4>
							<h2 className="title-inner1">from the blog</h2>
						</div>
					</div>
				</div>
			</div>
			<section className="blog p-t-0">
				<BlogSection />
			</section>
		</div>
	);
};

export default main;
