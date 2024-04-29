"use client";
import ActorPhoto from "@/components/actor";
import MovieReviews from "@/components/moviereview";
import { SparklesCore } from "@/components/paricles";
import Review from "@/components/review";
import { isUserLoggedIn } from "@/context/Auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Single = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const receivedData = searchParams.get("data") || "";

  // useEffect(() => {
  //   // Check if user is logged in
  //   if (!isUserLoggedIn()) {
  //     // Redirect to login page if not logged in
  //     router.push("/login");
  //   }
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${encodeURIComponent(
            receivedData
          )}&apikey=ea36a40e`
        );
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Ensure query.data is available before fetching data
    if (receivedData) {
      fetchData();
    }
  }, [receivedData]);

  return (
    <section>
      {/* {receivedData} */}
      <p className="text-6xl pb-5 text-[antiquewhite] text-center">
        <Link href="/">SCREEN DIARY</Link>
      </p>
      <div className="bg-black gap-10 flex flex-col bg-opacity-30 relative rounded-t-xl p-5">
        <div className="w-full z-[-1] absolute inset-0 h-100%">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        {data && (
          <>
            <div className="flex md:flex-row flex-col gap-10 ">
              <div className="p-5 min-w-fit group  ">
                <div className="group  ">
                  {data.Poster !== "N/A" ? (
                    <Image
                      alt=""
                      src={data.Poster}
                      width={1000}
                      className="rounded-lg group-hover:scale-105 transition-all h-100 w-100 md:h-80 md:w-60 "
                      height={600}
                    />
                  ) : (
                    <Image
                      alt=""
                      src="/Images/bgg.jpg"
                      width={1000}
                      className="rounded-lg group-hover:scale-105 transition-all h-100 w-100 md:h-80 md:w-60 "
                      height={600}
                    />
                  )}

                  {/* <p className="p-5 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-20 translate-y-0  text-white">
                {data.Title}
              </p> */}
                </div>
              </div>
              <div className="font-serif flex flex-col gap-8 text-white">
                <div className="flex flex-col gap-8 max-w-fit">
                  <h1 className="font-extrabold text-5xl py-4">
                    {data.Title}
                    <span className="font-normal text-3xl"> ({data.Year})</span>
                  </h1>
                  <div className="">
                    <p className="text-lg">
                      <u className="text-xl">Director</u>
                      :<br /> {data.Director}
                    </p>
                    <br />
                    <p className="text-lg">
                      <u className="text-xl">Writer</u> :
                      <br />
                      {data.Writer}
                    </p>
                  </div>
                  <p className="text-lg">
                    <u className="text-xl">Plot</u> : <br /> {data.Plot}
                  </p>
                </div>
                <div className="text-lg">
                  <u className="text-xl">Actors</u> : <br /> {data.Actors}
                </div>
                <div>
                  <u className="text-xl">Ratings</u> : <br />
                  <div className="grid  grid-cols-3">
                    {data.Ratings.map((rating) => (
                      <div key={rating.Source}>
                        <p className="text-lg">{rating.Source}</p>
                        <p>{rating.Value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Review movie={data.Title} receivedData={receivedData}></Review>
            <MovieReviews
              data={data}
              receivedData={receivedData}
            ></MovieReviews>
          </>
        )}
      </div>
    </section>
  );
};

export default Single;
