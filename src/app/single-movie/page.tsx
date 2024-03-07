"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Single = (props: Props) => {
  const router = useRouter();
  const receivedData = router?.query?.data || "";
  fetch(
    `http://www.omdbapi.com/?apikey=ea36a40e&s=${encodeURIComponent(
      receivedData
    )}`
  );
  console.log(receivedData);

  return <div>{receivedData}</div>;
};

export default Single;
