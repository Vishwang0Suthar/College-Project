import React from "react";
import Home from "../components/home";
import { AuthProvider } from "@/context/AuthContext";

type Props = {};

const page = (props: Props) => {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
};

export default page;
