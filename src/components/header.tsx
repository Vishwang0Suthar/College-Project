import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex gap-7 justify-center text-white text-lg font-semibold pt-6">
      <Link href="/">
        <p className="hover:underline hover:underline-offset-8 transition-all duration-300">Home</p>
      </Link>
      <Link href="/editors-pick">
        <p className="hover:underline hover:underline-offset-8 transition-all duration-300">Editor's Pick</p>
      </Link>
      <Link href="/about">
        <p className="hover:underline hover:underline-offset-8 transition-all duration-300">About Us</p>
      </Link>
    </div>
  );
};

export default Header;
