import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactStars from "react-stars";
import "./stars/stars.css";
type Review = {
  user: string;
  movie: string;
  movieAPI: string;
  text: string;
  rating: number; // Set the default rating to 0
  spoiler: boolean;
  view: boolean; // New property for each review
};

type Props = {
  data: {
    Title: string;
  };
  receivedData?: string;
};

const MovieReviews = ({ receivedData, data }: Props) => {
  const user = localStorage.getItem("username");
  const [reviews, setReviews] = useState<Review[]>([]);

  // Your fetchReviews function
  useEffect(() => {
    const fetchReviews = async (
      receivedData: string | undefined,
      user: string | null
    ) => {
      try {
        const response = await axios.get(`http://localhost:5000/review`, {
          params: {
            movieAPI: receivedData,
            username: user,
          },
        });
        console.log("Response:", response.data); // Add this line for debugging
        if (Array.isArray(response.data)) {
          const updatedReviews = response.data.map((review: Review) => ({
            ...review,
            view: !review.spoiler, // Set view to true if spoiler is false, otherwise false
          }));
          setReviews(updatedReviews); // Update reviews state with the fetched data
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews(receivedData, user);
  }, [receivedData, user]);

  const handleClick = (index: number) => {
    // Toggle the view property for the corresponding review
    setReviews((prevReviews) =>
      prevReviews.map((review, i) =>
        i === index ? { ...review, view: !review.view } : review
      )
    );
  };

  return (
    <div className="text-white p-4 flex flex-col gap-4 w-full lg:w-[50%]">
      {data.Title && reviews && (
        <>
          <h2 className="text-xl">Reviews for {data.Title}</h2>
          <div className="bg-black bg-opacity-40 rounded-xl  p-4">
            {reviews.map((review, index) => (
              <li
                key={index}
                className="appearance-none list-none border-b-2 my-2 py-2 "
              >
                <div className="flex flex-col relative gap-2 px-2">
                  {review.view ? (
                    <></>
                  ) : (
                    <div className="w-full text-gray-300 h-full z-[1] absolute flex-col  gap-2 justify-center items-center bg-black backdrop-blur-sm rounded-lg bg-opacity-40 flex">
                      <p>Following review contains spoiler</p>
                      <button
                        onClick={() => handleClick(index)}
                        className="p-1 px-4 bg-slate-300 text-gray-500  rounded-lg"
                      >
                        View
                      </button>
                    </div>
                  )}
                  <p className="bg-stone-400 bg-opacity-40 p-2 rounded-lg">
                    {review.text}
                  </p>
                  <div className="place-self-end flex flex-col gap-[2px]">
                    <p className=" text-gray-300">- {review.user}</p>
                    <div className="flex place-self-end z-[0] items-center">
                      <p className="text-sm p-1 px-2 mt-1">{review.rating}</p>
                      <ReactStars
                        count={5}
                        edit={false}
                        size={20}
                        className=""
                        color2={"#FBFADA"}
                        value={review.rating}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieReviews;
