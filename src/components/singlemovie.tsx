// pages/index.tsx

import { useState } from "react";
import { useRouter } from "next/router";
import MovieDetails from "./movie/[id]"; // Assuming your movie details page is under /pages/movie/[id].tsx

interface Movie {
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
}

export default function Home() {
  const [data, setData] = useState<Movie[] | null>(null);
  const [movieName, setMovieName] = useState<string>("");
  const router = useRouter();

  const handleCardClick = (imdbID: string) => {
    router.push(`/movie/${imdbID}`); // Redirect to MovieDetails page with the imdbID as a parameter
  };

  // Rest of your code remains unchanged
}

// pages/movie/[id].tsx

import { useRouter } from "next/router";

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query; // Access the imdbID from query params
  const imdbID = typeof id === "string" ? id : "";

  // Now you can use the imdbID to fetch and display details of the movie

  return <div>Movie Details Page for ID: {imdbID}</div>;
}
