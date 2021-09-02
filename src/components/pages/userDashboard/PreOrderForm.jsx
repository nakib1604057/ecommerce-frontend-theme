import React, { useState, useEffect } from "react";

const PreOrderForm = () => {
	const tagOptions = [
		{ value: "mobile", label: "Mobile" },
		{ value: "tshirt", label: "T-shirt" },
		{ value: "laptop", label: "Laptop" },
		{ value: "electronices", label: "Electronices" },
		{ value: "other", label: "Other" },
	];
	const [productName, setProductName] = useState("");
	const [productDetails, setProductDetails] = useState("");
	const [productType, setProductype] = useState(tagOptions[0].value);
	const [brand, setBrand] = useState("");
	const [qty, setQty] = useState(1);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [tag, setTag] = useState([tagOptions[0]]);
	const handelPoductName = (e) => {
		setProductName(e.target.value);
	};
	const handelProductDetails = (e) => {
		setProductDetails(e.target.value);
	};
	const handelProductType = (data) => {
		setTag(data);
		setProductype(data.value);
	};
	const handelBrand = (e) => {
		setBrand(e.target.value);
	};
	const handelQty = (data) => {
		setQty(data);
	};
	const handelPhoneNumber = (e) => {
		setPhoneNumber(e.target.value);
	};
	const onSubmit = async () => {
		try {
			// const data = {email,productName,productDetails,productType,qty,brand,phoneNumber}
			// const res = await savePreOrder(data)
			// fetchPandingPreOrder()
			// notifySticky();
		} catch (err) {
			// notifyError();
		}
	};
	return (
		<div className="mt-3">
			<form className="">
				<div class="form-group">
					<label for="exampleInputEmail1">Product Name</label>
					<input
						type="text"
						id="Name"
						class="form-control"
						name="productName"
						placeholder="iphone 12 pro max"
						onChange={handelPoductName}
						required
					/>
				</div>
				<div class="form-group">
					<label for="prodetails">Product Details</label>
					<textarea
						class="form-control"
						id="prodetails"
						rows="3"
						name="productDetails"
					></textarea>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Quantity</label>

					<input
						type="number"
						id="quantity"
						class="form-control"
						name="quantity"
						min="1"
						max="100"
						// className="w-100"
					/>
				</div>

				<div class="form-group">
					<label for="exampleInputPassword1">Phone Number</label>
					<input
						type="text"
						class="form-control"
						id="exampleInputPassword1"
						placeholder="0167434553"
                        // pattern="0-9" 
						required
					/>
				</div>
				<div class="form-check">
					<input type="checkbox" class="form-check-input" id="exampleCheck1" />
					<label class="form-check-label" for="exampleCheck1">
						Check me out
					</label>
				</div>
				<button type="submit" class="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
};

export default PreOrderForm;
