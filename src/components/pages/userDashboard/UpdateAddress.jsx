import React, { useState } from "react";
import { divisions } from "../../../constants/bdDivison";
import { districts } from "../../../constants/district";
import { countries } from "../../../constants/SelectTag";
import { toast } from "react-toastify";

import { updateUserAddress } from "../../../services/api/userApi";

const UpdateAddress = ({ userData }) => {
	const [userCountry, setUserCountry] = useState(
		userData.country ? userData.country : countries[0].value
	);
	const [userDivision, setUserDivision] = useState(
		userData.division ? userData.division : divisions[0].name
	);
	const [userCity, setUserCity] = useState(
		userData.city ? userData.city : districts[0].name
	);
	const [address, setAddress] = useState(userData.address);
	const [isLoading, setIsLoading] = useState(false);
	const [valError, setValError] = useState({ address: null });
	const handleCountryChange = (data) => {
		setUserCountry(data);
	};
	const handelCityChange = (e) => {
		setUserCity(e.target.value);
	};
	const handelDivisionChange = (e) => {
		setUserDivision(e.target.value);
	};
	const handleAddressChange = (e) => {
		setAddress(e.target.value);
		if (e.target.value.length > 10) {
			valError["address"] = null;
			setValError(valError);
		}
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		if (!address) {
			const arr = [];
			arr["address"] = "Please Give more information about address.";
			setValError(arr);
			return;
		}
		const userData = JSON.parse(localStorage.getItem("userInfo"));
		const userId = userData.id ? userData.id : null;
		const userAddress = {
			userId: userId,
			country: userCountry,
			city: userCity,
			division: userDivision,
			address: address,
		};
		// console.log(userAddress);
		saveUserAddress(userAddress);
	};
	const saveUserAddress = async (data) => {
		try {
			const res = await updateUserAddress(data);
			// console.log(res);
			toast.success(`Your Address Updated Successfully`);
		} catch (err) {
			// console.log(err.data);
			toast.error("Somthing Went Worng. Try Again.");
		}
	};
	return (
		<div>
			<div className="page-title border-bottom">
				<h3>Update Your Current Address</h3>
			</div>
			<form className="w-100">
				<div className="contianer">
					<div className="row" style={{ marginTop: "10px" }}>
						<div className="col-lg-6">
							<div className="form-group">
								<label for="country">Country</label>
								{/* <input
									type="text"
									class="form-control rounded border border-primary"
									id="fristName"
									aria-describedby="User Firs Name"
									placeholder="First Name"
									// defaultValue={}
								/> */}
								<select
									id="country"
									name="country"
									class="form-control rounded border border-primary"
									value={userCountry}
									onChange={(e) => setUserCountry(e.target.value)}
								>
									{countries.map((country) => (
										<option value={country.label}>{country.value}</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="form-group">
								<label for="division">State/Division</label>
								<select
									id="division"
									name="division"
									value={userData.division}
									class="form-control rounded border border-primary"
									onChange={(e) => setUserDivision(e.target.value)}
								>
									{divisions.map((item) => (
										<option value={item.name}> {item.label}</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="form-group">
								<label for="city">City</label>
								<select
									id="city"
									name="city"
									class="form-control rounded border border-primary"
									value={userData.city}
									onChange={(e) => setUserCity(e.target.value)}
								>
									{districts.map((item) => (
										<option value={item.name}>{item.name}</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="form-group">
								<label for="Address">Address</label>
								<textarea
									name="address"
									id="address"
									cols="30"
									rows="2"
									class="form-control rounded border border-primary"
									onChange={handleAddressChange}
								>
									{userData.address}
								</textarea>
								{valError.address ? (
									<p className="text-danger">{valError.address}</p>
								) : null}
							</div>
						</div>
					</div>
					<button type="submit" className="btn btn-solid" onClick={onSubmit}>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateAddress;
