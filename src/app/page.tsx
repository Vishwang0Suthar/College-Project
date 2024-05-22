"use client";
import React, { useEffect } from "react";
import Home from "../components/home";
import { useRouter } from "next/navigation";
import { isUserLoggedIn } from "../context/Auth";
import { AuthProvider } from "@/context/AuthContext";
const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    if (!isUserLoggedIn()) {
      // Redirect to login page if not logged in
      router.push("/login");
    }
  }, []); // Add an empty dependency array to run effect only once

  return (
    <>
      <React.StrictMode>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </React.StrictMode>
    </>
  );
};

export default Page;
