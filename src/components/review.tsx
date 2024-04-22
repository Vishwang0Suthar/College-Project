import React, { FormEvent, useState } from "react";
import Stars from "./stars/star";
import { Checkbox } from "@mui/material";
import { useRouter } from "next/navigation";

const Review = () => {
  const router = useRouter();
  const user = localStorage.getItem("username");
  const [rating, setRating] = useState(0);

  // Function to handle rating change
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const [reviewData, setReviewData] = useState({
    user: user,
    text: "",
    rating: 0,
    spoiler: false,
  });

  const handleChange = (event: FormEvent) => {
    const { name, value, checked, type } = event.target;

    // Handle checkbox differently
    if (type === "checkbox") {
      setReviewData({
        ...reviewData,
        [name]: checked,
      });
    } else {
      setReviewData({
        ...reviewData,
        [name]: value,
      });
    }
  };

  const review = async (event: FormEvent) => {
    event.preventDefault();
    console.log(reviewData);
    const res = await fetch("http://localhost:5000/review", {
      method: "POST",
      body: JSON.stringify(reviewData),
      headers: { "Content-Type": "application/json" },
    });
    const data1 = await res.json();
    alert(data1.message);
    if (data1.success) {
      alert("Review submitted successfully");
    }
  };

  return (
    <div className="p-4 flex flex-col">
      <form onSubmit={review}>
        <h2 className="text-4xl font-serif text-white">User Reviews</h2>
        <div className="flex mt-5 gap-5 w-full">
          <div className="flex-1 min-h-5">
            <textarea
              name="text"
              className="w-full focus:outline-none shadow-xl p-2"
              placeholder="Write your own Review"
              value={reviewData.text}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex-1 flex flex-col w-full ">
            <Stars
              name="rating"
              rating={rating}
              onRatingChange={handleRatingChange}
            />{" "}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="checkbox"
                name="spoiler"
                checked={reviewData.spoiler}
                onChange={handleChange}
                className="form-checkbox border-greenDark-50 h-5 w-5 text-beige-100"
              />
              <label htmlFor="checkbox" className="ml-2 text-white">
                Remember me
              </label>
            </div>
            <button type="submit" className="p-2 bg-black text-white">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Review;
