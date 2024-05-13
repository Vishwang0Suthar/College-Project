import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import bgImg from "./gb-ong.png";
import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

type Props = {
  profile: string | StaticImport;
  fullname: string | undefined;
  position: string | undefined;
  email: string | undefined;
  git: string | undefined;
  linkedin: string | undefined;
  insta: string | undefined;
};

function TeamCard({
  profile,
  fullname,
  position,
  email,
  git,
  linkedin,
  insta,
}: Props) {
  return (
    <section className="px-2 relative border-2 overflow-hidden border-[#AA9261] mt-16 gap-3 flex flex-col justify-center items-center text-center h-96 w-80  hover:bg-[antiquewhite] bg-[#B6C4B6]  rounded-2xl shadow-xl group hover:-translate-y-5 transition-all duration-300">
      <div className="absolute z-[-1] object-cover scale-125 opacity-0 transition-all duration-500 group-hover: group-hover:opacity-100 blur-[2px] ">
        <Image src={bgImg} height={600} width={400} alt="bg" />
      </div>
      <Image
        className="inline-flex object-cover border-2 p-1 border-[#AA9261] rounded-md  h-28 w-28 group-hover:scale-110 duration-300"
        src={profile}
        alt={"▼・ᴥ・▼"}
        height={96}
        width={96}
      ></Image>
      <p className="text-3xl text-black  font-semibold pt-4">{fullname}</p>
      <p className="text-lg text-greenDark-50 ">{position}</p>
      <p className="text-base ">{email}</p>
      <ul className="flex scale-150 mt-2">
        <li className="mx-2 hover:scale-150 duration-300">
          <a href={git} target="_blank" aria-label="GitHub">
            <FaGithub />
          </a>
        </li>

        <li className="mx-2 hover:scale-150 duration-300">
          <a href={linkedin} target="_blank" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </li>

        <li className="mx-2 hover:scale-150 duration-300">
          <a href={insta} target="_blank" aria-label="Instagram">
            <FaInstagram />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default TeamCard;
