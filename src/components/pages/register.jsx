import React, { Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { urls } from "../../constants/urls";
import { isEmailValid, isValidPassword } from "../../constants/utils";

import Breadcrumb from "../common/breadcrumb";

const Register = () => {
    const history = useHistory()
  const initialStateForRegistration = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  };
  const initialStateForError = {
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
    phoneNumber: null,
  };

  const [state, setState] = useState(initialStateForRegistration);
  const [error, setError] = useState(initialStateForError);

  const onChange = e => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    const { name, email, phoneNumber, confirmPassword, password } = state;
    console.log(name)
    if (name.trim().length === 0) {
      toast.error("Please Enter Your Name");

      return;
    }
    if (!isEmailValid(email)) {
      toast.error("Please Enter A Valid Email");

      return;
    }
    if (!isValidPassword(password)) {
      toast.error(
        "Password should contain no space and minimum 4 characters long."
      );

      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password does not matched.");

      return;
    }
    if (phoneNumber.trim < 11) {
      toast.error("Phone number must be 11 characters long.");
      return;
    }
    onRegister();
  };
  const onRegister = async () => {
    const { name, email, phoneNumber, confirmPassword, password } = state;
    try {
      const res = await axiosInstance().post(urls.REGISTER_URL, {
        name: name,
        phonenumber: phoneNumber,
        email: email,
        password: password,
      });

      toast.success("Successfully Registered. Please login again with your email and password!")
      history.replace('/pages/login')
    } catch (error) {
      toast.error(error.data.error.message);
    }
  };
  console.log(state)
  return (
    <div>
      <Breadcrumb title={"create account"} />

      {/*Regsiter section*/}
      <section className="register-page section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3>create account</h3>
              <div className="theme-card">
                <form className="theme-form">
                  <div className="form-row">
                    <div className="col-md-6">
                      <label htmlFor="email">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fname"
                        placeholder="First Name"
                        name="name"
                        value={state.name}
                        onChange={onChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="review">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lname"
                        placeholder="Phone Number"
                        name="phoneNumber"
                        value={state.phoneNumber}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        name="email"
                        value={state.email}
                        onChange={onChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="review">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="review"
                        placeholder="Enter your password"
                        name="password"
                        value={state.password}
                        onChange={onChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="review">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="review"
                        value={state.confirmPassword}
                        placeholder="Re-Enter your password"
                        name="confirmPassword"
                        onChange={onChange}
                      />
                    </div>
                    <button className="btn btn-solid" onClick={onSubmit}>
                      create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
