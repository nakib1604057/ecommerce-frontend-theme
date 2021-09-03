import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../api/axiosInstance";
import { urls } from "../../../constants/urls";
import { isUserLoggedIn } from "../../../constants/utils";

const PreOrderForm = ({ onCloseModal }) => {
  const initialStateForProducts = {
    productName: "",
    productDetails: "",
    qty: 0,
    phoneNumber: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(initialStateForProducts);

  useEffect(() => {
    return () => {
      setState(initialStateForProducts);
    };
  }, []);
  const onSubmit = async () => {
    const { productName, productDetails, qty, phoneNumber } = state;

    if (productName.trim().length === 0) {
      toast.error("Please Enter Product Name.");
      return;
    }
    if (productDetails.trim().length === 0) {
      toast.error("Please Enter Some Product Details.");
      return;
    }
    if (qty === 0) {
      toast.error("Please Enter Product Quantity.");
      return;
    }
    if (phoneNumber.trim().length === 0 || phoneNumber.trim().length < 11) {
      toast.error("Please Enter A Phone Number");
    }

    onPreOrder();
  };

  const onPreOrder = async () => {
    const { productName, productDetails, qty, phoneNumber } = state;

    setIsLoading(true);
    const user = isUserLoggedIn();
    try {
      const res = await axiosInstance().post(urls.PRE_ORDER, {
        email: user.email,
        productName: productName,
        productDetails: productDetails,
        qty: qty,
        phoneNumber: phoneNumber,
      });
      setIsLoading(false);
      onCloseModal();
      toast.success("Wait for admin approval.");
    } catch (error) {
      toast.error(error.data.error.message);
      setIsLoading(false);
    }
  };

  const onChange = e => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
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
            placeholder="Product Name"
            required
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <label for="prodetails">Product Details</label>
          <textarea
            class="form-control"
            id="prodetails"
            rows="3"
            name="productDetails"
            onChange={onChange}
          ></textarea>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Quantity</label>

          <input
            type="number"
            id="quantity"
            class="form-control"
            name="qty"
            min="1"
            max="100"
            onChange={onChange}
            // className="w-100"
          />
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">Phone Number</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Phone Number"
            // pattern="0-9"
            name="phoneNumber"
            onChange={onChange}
            required
          />
        </div>
        {isLoading ? (
          <div>
            <div className="loading-cls"></div>
          </div>
        ) : (
          <button type="submit" class="btn btn-primary" onClick={onSubmit}>
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default PreOrderForm;
