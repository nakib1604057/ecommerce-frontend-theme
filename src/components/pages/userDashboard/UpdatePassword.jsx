import React, { useState, useEffect } from "react";
import { isValidPassword } from "../../../constants/utils";
import { toast } from "react-toastify";
import { updateUserPassword } from "../../../services/api/userApi";
const UpdatePassword = ({ userData }) => {
	const [currentPassword, setCurrentPassword] = useState(null);
	const [newPassword, setNewPassword] = useState(null);
	const [retypePassword, setRetypePassword] = useState(null);
	const [valError, setValError] = useState({
		currentPassword: null,
		newPassword: null,
		retypePassword: null,
	});

	const handleCurrentPasswordChange = (e) => {
		setCurrentPassword(e.target.value);
		valError.currentPassword = null;
		setValError(valError);
		return;
	};
	const handleNewPasswordChange = (e) => {
		setNewPassword(e.target.value);
		valError.newPassword = null;
		setValError(valError);
		return;
	};
	const handleRetypePassword = (e) => {
		setRetypePassword(e.target.value);
		valError.retypePassword = null;
		setValError(valError);
		return;
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (!currentPassword) {
			const arr = [];
			arr["currentPassword"] = "Please Enter your password";
			setValError(arr);
			return;
		}

		if (!isValidPassword(currentPassword)) {
			const arr = [];
			arr["currentPassword"] =
				"Password should contain no space and minimum 4 characters long.";
			setValError(arr);
			return;
		}
		if (!newPassword) {
			const arr = [];
			arr["newPassword"] = "Please Enter your password";
			setValError(arr);
			return;
		}

		if (!isValidPassword(newPassword)) {
			const arr = [];
			arr["newPassword"] =
				"Password should contain no space and minimum 4 characters long.";
			setValError(arr);
			return;
		}
		if (newPassword !== retypePassword) {
			const arr = [];
			arr["retypePassword"] =
				"Password and retype password need to be same.";
			setValError(arr);

			return;
		}
		if (newPassword === retypePassword) {
			const userData = JSON.parse(localStorage.getItem("userInfo"));
			const email = userData.email ? userData.email : "";
			const userId = userData.id ? userData.id : "";

			if (userId && email) {
				// console.log(data.oldPassword)
				const sendData = {
					userId: userId,
					email: email,
					password: currentPassword,
					newPassword: newPassword,
				};
				saveNewPassword(sendData);
			}
		}
	};

	const saveNewPassword = async (data) => {
		try {
			const res = await updateUserPassword(data);
			toast.success(`Your Password Updated Successfully.`);

		} catch (err) {
			toast.error(err.data.error.message);
			

        }
	};

	return (
		<div>
			<div className="page-title border-bottom">
				<h3>Update Password</h3>
			</div>
			<form className="w-100">
				<div className="contianer">
					<div className="row" style={{ marginTop: "10px" }}>
						<div className="col-lg-6">
							<div className="form-group">
								<label for="oldpassword">Current Password</label>
								<input
									type="password"
									class="form-control rounded border border-primary"
									id="oldpassword"
									aria-describedby="User Current Password"
									placeholder="........."
									onChange={handleCurrentPasswordChange}
								/>
							</div>
							{valError.currentPassword ? (
								<p className="text-danger">{valError.currentPassword}</p>
							) : null}
						</div>
					</div>
					<div className="row">
						<div className="col-lg-6">
							<div className="form-group">
								<label for="newpassword">New Password</label>
								<input
									type="password"
									class="form-control rounded border border-primary"
									id="newpassword"
									aria-describedby="User New Password"
									placeholder="........."
									onChange={handleNewPasswordChange}
								/>
							</div>
							{valError.newPassword ? (
								<p className="text-danger">{valError.newPassword}</p>
							) : null}
						</div>
						<div className="col-lg-6">
							<div className="form-group">
								<label for="retypepassword">Retype Password</label>
								<input
									type="password"
									class="form-control rounded border border-primary"
									id="retypepassword"
									aria-describedby="Retype Password"
									placeholder="........"
									onChange={handleRetypePassword}
								/>
							</div>
							{valError.retypePassword ? (
								<p className="text-danger">{valError.retypePassword}</p>
							) : null}
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

export default UpdatePassword;
