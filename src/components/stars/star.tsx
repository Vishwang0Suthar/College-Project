import React from "react";
import ReactStars from "react-stars";
import "./stars.css";

export default function Stars({ rating, onRatingChange }) {
  return (
    <div className="flex items-center gap-2">
      <ReactStars
        count={5}
        size={36}
        color2={"#ffd700"}
        value={rating} // Use the rating prop passed from the parent
        onChange={onRatingChange} // Call parent's callback for rating change
      />
      <div className=" bg-black rounded-md text-white hover:bg-white duration-300 min-w-24 hover:text-black select-none p-3 px-6 h-10 flex items-center -mb-10px ">
        <p className="rating text-xl text-center duration-200 w-full">
          {rating === 0 ? "Rate" : rating}
        </p>
      </div>
    </div>
  );
}
