"use client";
import Image from "next/image";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";
import pic from "../../public/assets/images/Category-04.jpg";
import { SparklesCore } from "@/components/paricles";
import { Spotlight } from "@/components/spotlight";
import MovieDetails from "./singlemovie";
import Link from "next/link";
import HashLoader from "react-spinners/HashLoader";
import Movieslides from "./movieslides";

// import { connectToDatabase } from "@/lib/mongodb/index.mjs";

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    // Set the initial state to false when the component mounts
    setImageLoaded(true);
  }, []);

  const handleImageLoad = () => {
    // This function will be called when the image is successfully loaded
    setImageLoaded(true);
  };

  const [data, setData] = useState(null);
  const [movieName, setMovieName] = useState(""); // State to hold the movie name entered by the user

  const handleInputChange = (event) => {
    setMovieName(event.target.value);
    setImageLoaded(false); // Update the movieName state with the entered value
  };
  async function exampleFunction() {
    try {
      // Connect to the MongoDB database
      const db = await connectToDatabase();
      console.log("Connected to MongoDB database:", db.databaseName);

      // Perform database operations
      // Example: const result = await db.collection('myCollection').find({}).toArray();
    } catch (error) {
      console.error("Error:", error);
    }
  }
  // exampleFunction();
  useEffect(() => {
    if (movieName.trim() !== "") {
      fetch(
        `http://www.omdbapi.com/?apikey=ea36a40e&s=${encodeURIComponent(
          movieName
        )}`
      )
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error));
    } else {
      setData(null); // Clear data when movieName is empty
    }
  }, [movieName]);

  return (
    <>
      <div>
        <div className="">
          <Spotlight className="absolute left-1/4 -top-1/3" />
        </div>
        <p className="text-9xl pt-20 text-[#FBFADA] text-center font-mono font-semibold">
          <Link href="/">SCREEN DIARY</Link>
        </p>
        <div className="w-full z-[-1] absolute inset-0 h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-72"
            particleColor="#FFFFFF"
          />
        </div>
      </div>
      {/* <Movieslides /> */}
      <div className="py-10 z-10 px-16 mt-20 flex gap-2 justify-center relative">
        <input
          type="text"
          className="relative p-2 w-96 rounded-sm focus:ring-green-700 focus:outline-none ring-2"
          placeholder="enter a movie name"
          value={movieName} // Bind the input value to the movieName state
          onChange={handleInputChange}
        />
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="1em"
          width="1em"
          className="absolute flex left-[60%] opacity-35"
        >
          <path d="M11 20H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h1l2 4h3L8 4h2l2 4h3l-2-4h2l2 4h3l-2-4h4v9c-.5-.8-1.2-1.5-2-2v-1H5.8L4 6.5V18h6.2c.2.7.4 1.4.8 2m9.3-1.1c.4-.7.7-1.5.7-2.4 0-2.5-2-4.5-4.5-4.5S12 14 12 16.5s2 4.5 4.5 4.5c.9 0 1.7-.2 2.4-.7l3.1 3.1 1.4-1.4-3.1-3.1m-3.8.1c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
        </svg>
        {/* <div className="h-10 aspect-square bg-green-800" id="search"></div> */}
      </div>

      {data ? (
        <div
          className="grid px-16 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 "
          onLoad={handleImageLoad}
        >
          {data.Search &&
            data.Search.map((movie) => (
              <Link
                key={movie.imdbID}
                href={{
                  pathname: "/single-movie",
                  query: { data: movie.imdbID },
                }}
              >
                <>
                  <div className="rounded-lg z-0 overflow-hidden bg-[antiquewhite]">
                    <div
                      className="p-2 rounded-t-lg overflow-hidden h-fit "
                      // onClick={() => handleClick(movie.imdbID)}
                    >
                      {movie.Poster !== "N/A" ? (
                        <Image
                          src={movie.Poster}
                          alt={movie.Title}
                          width={600}
                          height={900}
                          className="rounded-md"
                        />
                      ) : (
                        <Image
                          src="/Images/bgg.jpg" // Replace "/placeholder.jpg" with the URL of your placeholder image
                          alt={movie.Title}
                          width={600}
                          height={900}
                        />
                      )}
                    </div>
                    <div className="rounded-tl-lg rounded-tr-lg py-2 px-4 flex flex-col text-black text-lg">
                      <p className="font-semibold font-mono">{movie.Title}</p>
                      <p className="font-semibold font-mono">{movie.Year}</p>
                    </div>
                  </div>
                </>
              </Link>
            ))}
        </div>
      ) : (
        <div
          className={`flex justify-center ${
            imageLoaded ? "hidden" : ""
          } items-center  h-[150px]  w-full`}
        >
          {/* <ClimbingBoxLoader className="scale-150" color={loaderColor} /> */}
          <HashLoader className="scale-150" color="#FBFADA" />
        </div>
      )}
      <div className="py-12 items-center w-full flex flex-col gap-4 px-10">
        <h1 className="text-3xl font-semibold text-[antiquewhite]">About</h1>
        <p className="text-white">
          ScreenDiary is a web-portal designed for cinephiles,
          offering an immersive platform to track their viewing history,
          discover new films, and connect with other movie enthusiasts. It
          enables users to create personalized profiles, curate and maintain a
          comprehensive record of their viewing history, and foster a sense of
          community through discussion forums, challenges, and sharing thoughts.
          ScreenDiary employs advanced recommendation algorithms to enhance the
          movie discovery process, generating tailored film suggestions and a
          curated list of popular genres and critically acclaimed masterpieces.
          The user-friendly interface and intuitive design ensure a seamless
          experience for cinephiles of all levels. ScreenDiary supports
          cross-platform compatibility and offline functionality, making it the
          go-to website for passionate film lovers.
        </p>
      </div>
    </>
  );
}
