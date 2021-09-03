import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../../api/axiosInstance";
import { urls } from "../../../../constants/urls";
import { isUserLoggedIn } from "../../../../constants/utils";
export default function PostReview({ id }) {
  const history = useHistory();

  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const postComment = async e => {
    e.preventDefault();
    setIsLoading(true);
    const user = isUserLoggedIn();
    try {
      const res = await axiosInstance().post(urls.POST_RATINGS, {
        comment: comment,
        ratings: ratings,
        user_email: user.email,
        product_id: id,
      });
      setIsLoading(false);
      toast.success(res.data.massage);
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      toast.error(error.data.massage);
    }
  };
  return (
    <div className="col-md-6 ">
      <div className="col-md-12">
        {/* <div className="media m-0">
          <label>Rating</label>
          <div className="media-body ml-3">
            <div className="rating three-star">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </div>
          </div>
        </div> */}
        <label htmlFor="review">Write your review</label>
        <textarea
          className="form-control"
          placeholder="Wrire Your Testimonial Here"
          id="exampleFormControlTextarea1"
          rows="6"
          onChange={e => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="col-md-12">
        {isLoading ? (
          <div>
            <div className="loading-cls"></div>
          </div>
        ) : (
          <button
            className="btn btn-solid"
            type="submit"
            onClick={
              isUserLoggedIn() ? postComment : history.push("/pages/login")
            }
          >
            Submit YOur Review
          </button>
        )}
      </div>
    </div>
  );
}
