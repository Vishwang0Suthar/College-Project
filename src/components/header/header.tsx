"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./header.css";
import clsx from "clsx";

type Props = {};

const Header = (props: Props) => {
  const [scrolled, setScrolled] = useState(false);
  // const audio_click = new Audio(clickSound);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={clsx(
        "flex gap-7 sticky top-0  justify-center z-[2] transition-all duration-500 text-lg text-white font-semibold py-6",
        {
          "bg-[#AA9261] bg-opacity-95 text-greenDark-50": scrolled,
        }
      )}
    >
      <Link href="/">
        <p className="home">Home</p>
      </Link>
      <Link href="/editors-pick">
        <p className="editors-pick">Editor's Pick</p>
      </Link>
      <Link href="/about">
        <p className="about">About Us</p>
      </Link>
    </div>
  );
};

export default Header;
