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
        <Spotlight />
        <p className="text-9xl pt-20 text-[#FBFADA] text-center font-mono font-semibold">
          SCREEN DIARY
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
      <div className="py-10 z-10 px-16 mt-20 flex gap-2">
        <input
          type="text"
          className="p-2 rounded-sm focus:ring-green-700 focus:outline-none ring-2"
          placeholder="enter a movie name"
          value={movieName} // Bind the input value to the movieName state
          onChange={handleInputChange}
        />
        <div className="h-10 aspect-square bg-green-800" id="search"></div>
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
                  <div className="rounded-lg z-0 overflow-hidden bg-white">
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
                        />
                      ) : (
                        <Image
                          src="/placeholder.jpg" // Replace "/placeholder.jpg" with the URL of your placeholder image
                          alt={movie.Title}
                          width={600}
                          height={900}
                        />
                      )}
                    </div>
                    <div className=" rounded-tl-lg rounded-tr-lg p-2 px-3 flex flex-col text-black text-lg">
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
    </>
  );
}
