import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import { urls } from "../../../../constants/urls";
import { timeToDate } from "../../../../constants/utils";

export default function Reviews({ id }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_RATINGS + id);
      setReviews([...res.data.results]);
    } catch (error) {}
  };

  return (
    <div className="col-sm-6">
      <ul className="comment-section">
        {reviews.map((review, index) => {
          return (
            <li className="mb-1 mr-1">
              <div className="media">
                <div className="media-body">
                  <h5>
                    {review.first_name} {review.last_name || ""}{" "}
                    <span>( {timeToDate(review.time)} )</span>
                  </h5>
                  <p>{review.comment}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
