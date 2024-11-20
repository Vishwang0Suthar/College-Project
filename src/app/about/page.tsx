import React from "react";
import TeamCard from "./components/teamcard";

type Props = {};

const About = (props: Props) => {
  const aboutUsData = {
    TeamCardData: [
      {
        profile: "/Images/linkpfp.jpg",
        fullname: "Harshil Valiya",
        position: "Team Member",
        email: "harshilvaliya40@gmail.com",
        git: "https://github.com/harshilvaliya",
        linkedin: "https://www.linkedin.com/in/harshil-valiya-1b1082274/",
        insta: "https://www.instagram.com/harshil_valiya/",
      },
      {
        profile: "/Images/VishwangProfile.jpg",
        fullname: "Vishwang Suthar",
        position: "Team Leader",
        email: "vishwangsuthar.997@gmail.com",
        git: "https://github.com/Vishwang0Suthar",
        linkedin: "https://www.linkedin.com/in/vishwang-suthar-062b39233/",
        insta: "https://www.instagram.com/vishwang._.suthar/",
      },
      {
        profile: "/Images/RaviProfile.jpeg",
        fullname: "Ravi Sanghani",
        position: "Team Member",
        email: "jasanghani126@gmail.com",
        git: "",
        linkedin: "https://www.linkedin.com/in/ravi-sanghani-662b30237/",
        insta: "https://www.instagram.com/ravi_sanghani_1206/",
      },
    ],
  };

  return (
    <div className="py-12 items-center w-full flex flex-col gap-4 px-20">
      <h1 className="text-3xl font-semibold text-[antiquewhite]">About</h1>
      <p className="text-white">
        ScreenDiary is a web-portal designed for cinephiles, offering an
        immersive platform to track their viewing history, discover new films,
        and connect with other movie enthusiasts. It enables users to create
        personalized profiles, curate and maintain a comprehensive record of
        their viewing history, and foster a sense of community through
        discussion forums, challenges, and sharing thoughts. ScreenDiary employs
        advanced recommendation algorithms to enhance the movie discovery
        process, generating tailored film suggestions and a curated list of
        popular genres and critically acclaimed masterpieces. The user-friendly
        interface and intuitive design ensure a seamless experience for
        cinephiles of all levels. ScreenDiary supports cross-platform
        compatibility and offline functionality, making it the go-to website for
        passionate film lovers.
      </p>

      <div className="pt-10">
        <div className="flex justify-center py-3 text-[antiquewhite]">
          <p className="text-4xl font-bold">Team Details</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 px-5 pb-5 ">
          {aboutUsData.TeamCardData.map((item, index) => {
            return (
              <div key={index}>
                <TeamCard
                  profile={item.profile}
                  fullname={item.fullname}
                  position={item.position}
                  email={item.email}
                  git={item.git}
                  linkedin={item.linkedin}
                  insta={item.insta}
                ></TeamCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
