import React, { useState } from "react";
import { updateGeneralInfo } from "../../../services/api/userApi";
import { toast } from "react-toastify";

const UpdateGeneralInfo = ({ userData }) => {
	const [loading, setLoading] = useState(false);
	const [firstName, setFirstName] = useState(userData.first_name);
	const [lastName, setLastName] = useState(userData.last_name);
	const [userName, setUserName] = useState(userData.user_name);
	const [phoneNumber, setPhoneNumber] = useState(userData.phone_number);
	const [valErrors, setValErrors] = useState({
		firstName: null,
		lastName: null,
		userName: null,
		phoneNumber: null,
	});

	const [error, setError] = useState(null);

	const handleUserNameChange = (e) => {
		setUserName(e.target.value);
		valErrors["userName"] = null;
		setValErrors(valErrors);
		setError(null)
	};
	const handleFirstNameChange = (e) => {
		setFirstName(e.target.value);
		valErrors["firstName"] = null;
		setValErrors(valErrors);
	};
	const handleLastNameChange = (e) => {
		setLastName(e.target.value);
		valErrors["lastName"] = null;
		setValErrors(valErrors);
		
	};
	const handlePhoneNumberChange = (e) => {
		setPhoneNumber(e.target.value);
		valErrors["phoneNumber"] = null;
		setValErrors(valErrors);
		setError(null)

	};
	const onSubmit = async (e) => {
		e.preventDefault();
		if (!firstName || firstName.trim().lenght < 3) {
			const arr = [];
			arr["firstName"] = "First Name should contain atleast 4 character";
			setValErrors(arr);

			return;
		}
		if (!lastName || lastName.trim().length < 3) {
			const arr = [];
			arr["lastName"] = "Last Name should contain atleast 4 character";
			setValErrors(arr);
			return;
		}
		if (!userName || userName.trim().length < 3) {
			const arr = [];
			arr["userName"] = "User Name should contain atleast 4 character";
			setValErrors(arr);
			return;
		}
		if (!phoneNumber || phoneNumber.trim().length !== 11) {
			const arr = [];
			arr["phoneNumber"] = "Phone Number should contain atleast 11 digit";
			setValErrors(arr);
			return;
		}
		const userData = JSON.parse(localStorage.getItem("userInfo"));
		const userId = userData.id;
		const newdata = {
			firstName: firstName,
			lastName: lastName,
			userName: userName,
			phoneNumber: phoneNumber,
			userId: userId,
		};
		saveGeneralInfo(newdata);
	};
	const saveGeneralInfo = async (data) => {
		try {
			setLoading(true);
			// console.log(newdata);
			const res = await updateGeneralInfo(data);
			if (res) {
				setLoading(false);
				// notifySticky("Successfull", "Data Saved Successfully");
				// console.log("successfull");
				toast.success(`Your General Info Updated Successfully`);
			}
		} catch (err) {
			// console.log(err.data);

			if (err.data.error.status == 409) {
				setLoading(false);

				setError(err.data.error.message);
			}
		}
	};

	return (
		<div>
			{loading ? (
				<div>
					<div className="loading-cls"></div>
				</div>
			) : (
				<div>
					<div className="page-title border-bottom">
						<h3>Update General Info</h3>
					</div>
					<form className="w-100">
						<div className="contianer">
							<div className="row" style={{ marginTop: "10px" }}>
								<div className="col-lg-6">
									<div className="form-group">
										<label for="firstName">First Name</label>
										<input
											type="text"
											class="form-control rounded border border-primary"
											id="fristName"
											aria-describedby="User Firs Name"
											placeholder="First Name"
											defaultValue={firstName}
											onChange={handleFirstNameChange}
										/>
									</div>
									{valErrors.firstName ? (
										<p className="text-danger">{valErrors.firstName}</p>
									) : null}
								</div>
								<div className="col-lg-6">
									<div className="form-group">
										<label for="lastName">Last Name</label>
										<input
											type="text"
											class="form-control rounded border border-primary"
											id="lastName"
											aria-describedby="User Last Name"
											placeholder="Last Name"
											defaultValue={lastName}
											onChange={handleLastNameChange}
										/>
									</div>
									{valErrors.lastName ? (
										<p className="text-danger">{valErrors.lastName}</p>
									) : null}
								</div>
								<div className="col-lg-6">
									<div className="form-group">
										<label for="userName">User Name</label>
										<input
											type="text"
											class="form-control rounded border border-primary"
											id="userName"
											aria-describedby="User username"
											placeholder="userName"
											defaultValue={userName}
											onChange={handleUserNameChange}
										/>
									</div>
									{valErrors.userName ? (
										<p className="text-danger">{valErrors.userName}</p>
									) : null}
								</div>
								<div className="col-lg-6">
									<div className="form-group">
										<label for="phonenumber">Phone Number</label>
										<input
											type="number"
											class="form-control rounded border border-primary"
											id="phonenumber"
											aria-describedby="User Phonenumber"
											placeholder="012313123"
											defaultValue={phoneNumber}
											onChange={handlePhoneNumberChange}
										/>
									</div>
									{valErrors.phoneNumber ? (
										<p className="text-danger">{valErrors.phoneNumber}</p>
									) : null}
								</div>
								{error ? (
									<div className="col-12 mt-75" sm="12">
										{/* <Alert className="mb-50" color="danger"> */}
										<h5 className="text-danger alert alert-danger text-center rounded">
											{error}
										</h5>
										{/* </Alert> */}
									</div>
								) : null}
							</div>
							<button
								type="submit"
								className="btn btn-solid"
								onClick={(e) => {
									onSubmit(e);
								}}
							>
								Save
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default UpdateGeneralInfo;
