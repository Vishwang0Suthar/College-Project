import React, { FormEvent, useState } from "react";
import Stars from "./stars/star";
import { useRouter } from "next/navigation";

type Props = {
  movie?: string;
  receivedData?: string;
};

const Review = ({ movie, receivedData, ...props }: Props) => {
  const router = useRouter();
  const user = localStorage.getItem("username");

  // State for review data
  const [reviewData, setReviewData] = useState({
    user: user,
    movie: movie,
    movieAPI: receivedData,
    text: "",
    rating: 0, // Set the default rating to 0
    spoiler: false,
  });

  // Function to handle rating change
  const handleRatingChange = (newRating) => {
    setReviewData({
      ...reviewData,
      rating: newRating, // Update the rating in reviewData
    });
  };

  // Function to handle form inputs change
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

  // Function to submit review
  const review = async (event: FormEvent) => {
    event.preventDefault();
    console.log(reviewData);

    try {
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
    } catch (error) {
      console.error("Error submitting review:", error);
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
              className="w-full focus:outline-none shadow-xl p-2 rounded-md"
              placeholder="🖋 Write your own Review"
              value={reviewData.text}
              rows={5}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex-1 flex flex-col gap-2 w-full ">
            <Stars
              rating={reviewData.rating} // Pass the rating from reviewData
              onRatingChange={handleRatingChange}
            />
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
                Contains Spoiler?
              </label>
            </div>
            <button
              type="submit"
              className="p-2 rounded-md hover:bg-white hover:text-black duration-500 bg-black text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Review;
