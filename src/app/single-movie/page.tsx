"use client";
import ActorPhoto from "@/components/actor";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Single = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const receivedData = searchParams.get("data") || "";

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
      {data && (
        <div className="flex gap-20">
          <div className="p-5 min-w-fit group  ">
            <div className="group  ">
              <Image
                alt=""
                src={data.Poster}
                width={1000}
                className="rounded-lg group-hover:scale-105 transition-all h-80 w-60 "
                height={600}
              />
              {/* <p className="p-5 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-20 translate-y-0  text-white">
                {data.Title}
              </p> */}
            </div>
          </div>
          <div className="font-serif flex flex-col gap-14 text-white">
            <div className=" flex flex-col gap-4  max-w-fit">
              <h1 className=" font-extrabold text-6xl py-4 ">
                {data.Title}{" "}
                <span className="font-normal">- ({data.Year})</span>
              </h1>
              <div className="font-extralight">
                <p>
                  <u>Director</u> : {data.Director}
                </p>
                <p>
                  <u>Writer</u> : {data.Writer}
                </p>
              </div>
              <p className="text-xl font-extralight line-clamp-5">
                {data.Plot}
              </p>
            </div>
            <div className="grid  grid-cols-3">
              {data.Ratings.map((rating) => (
                <div key={rating.Source}>
                  <p className="text-xl font-extrabold">{rating.Source}</p>
                  <p>{rating.Value}</p>
                </div>
              ))}
            </div>
            <div className="grid  grid-cols-3">
              <ActorPhoto actorName={data.Actors} />
            </div>
            <div className="text-xl">Actors: {data.Actors}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Single;
