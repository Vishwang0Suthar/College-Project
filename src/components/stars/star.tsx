"use client";
import "./stars.css";
import React, { useState } from "react";
import ReactStars from "react-stars";
import "./number-animation"; //odometer animation
export default function Stars() {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="flex items-center gap-2 ">
      <ReactStars
        count={5}
        size={36}
        color2={"#ffd700"}
        value={rating} // Set the initial value to display
        onChange={handleRatingChange} // Callback for rating change
      />
      <div className=" bg-black rounded-md text-white hover:bg-white duration-500 min-w-24 hover:text-black select-none p-3 px-6 h-10 flex items-center -mb-10px ">
        <p className="rating text-xl text-center duration-200 w-full">
          {rating === 0 ? "Rate" : rating}
        </p>
      </div>
    </div>
  );
}
