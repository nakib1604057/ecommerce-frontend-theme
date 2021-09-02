import React, { Component, useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import {useForm} from "rea

import Breadcrumb from "../common/breadcrumb";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [valErrors, setValErrors] = useState({email:null, password:null});
	const history = useHistory();

	const handleEmailChange = (e) => {
		const errs = valErrors;
		setEmail(e.target.value);
		valErrors['email'] = null
		setValErrors(valErrors);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
		valErrors['password'] = null
		setValErrors(valErrors);
	};
	const onSubmit = async (e) => {
		// if (isObjEmpty(errors)) {
		try {
			e.preventDefault();
            
            if(!email){
                const arr =[]
                arr['email'] ="Please Enter your email"
                setValErrors(arr)
            }
            else if(!password){
                const arr = []
                arr['password'] ="Please Enter your password";
                setValErrors(arr)
            }
            else{
                // console.log(email, password);
			// const res = await loginApi(email, password);
               
            }
			// const data = {
			// 	email: email,
			// 	userId: res.data.id,
			// 	firstName: res.data.firstName,
			// 	lastName: res.data.lastName,
			// 	profilePic: res.data.profilePic,
			// 	accessToken: res.data.accessToken,
			// 	refreshToken: res.data.refreshToken,
			// 	lastLogin: new Date().getTime() / 1000,
			// };
			// console.log(data)
			// // dispatch(handleLogin(data));
			// history.push("/");
		} catch (err) {
			// const arr = {};
			// arr["invalid"] = err.data.error.message;
			// setValErrors(arr);
			// console.log(err.data.error.message);
		}
	};
	return (
		<div>
			<Breadcrumb title={"Login"} />

			{/*Login section*/}
			<section className="login-page section-b-space">
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<h3>Login</h3>
							<div className="theme-card">
								<form className="theme-form">
									<div className="form-group">
										<label htmlFor="email">Email</label>
										<input
											type="email"
											className="form-control"
											id="email"
											placeholder="Email"
											required
											onChange={handleEmailChange}
										/>
									</div>
                                    {valErrors.email?(<p className="text-danger">{valErrors.email}</p>):null}
									<div className="form-group">
										<label htmlFor="review">Password</label>
										<input
											type="password"
											className="form-control"
											id="review"
											placeholder="Enter your password"
											required
                                            value={password}
											onChange={handlePasswordChange}
										/>
                                    {valErrors.password?(<p className="text-danger">{valErrors.password}</p>):null}
										
									</div>

									<button
										type="submit"
										className="btn btn-solid"
										onClick={onSubmit}
									>
										Login
									</button>
								</form>
							</div>
						</div>
						<div className="col-lg-6 right-login">
							<h3>New Customer</h3>
							<div className="theme-card authentication-right">
								<h6 className="title-font">Create A Account</h6>
								<p>
									Sign up for a free account at our store. Registration is quick
									and easy. It allows you to be able to order from our shop. To
									start shopping click register.
								</p>
								<a href="#" className="btn btn-solid">
									Create an Account
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Login;
