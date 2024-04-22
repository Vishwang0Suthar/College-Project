import React from "react";
import Stars from "./stars/star";
import { Checkbox } from "@mui/material";

type Props = {};

const Review = (props: Props) => {
  return (
    <>
      <div className="p-4 flex flex-col">
        <h2 className="text-3xl font-serif text-white px-4">
          <u>User Reviews</u>
        </h2>
        <div className="flex mt-5 gap-5 w-full">
          <div className="flex-1 min-h-5">
            <textarea
              className="w-full focus:outline-none shadow-xl p-2 rounded-md"
              placeholder="Write your own Review"
            ></textarea>
          </div>

          <div className="flex-1 flex flex-col w-full ">
            <Stars></Stars>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="checkbox"
                className="form-checkbox border-greenDark-50 h-5 w-5 text-beige-100"
              />
              <label htmlFor="checkbox" className="ml-2 text-white">
                Remember me
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
