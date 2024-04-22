"use client";

import { ParallaxScroll } from "@/components/parallaxscroll";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const images = [
    "/images/Dune- Part Two (2024).jpg",
    "/images/Interstellar (2014).jpeg",
    "/images/The Suicide Squad (2021) (1).jpg",
    "/images/Top Gun- Maverick (2022).jpg",
    "/images/Raya and the Last Dragon (2021).jpg",
    "/images/A Silent Voice- The Movie (2016).png",
    "/images/Arcane (2021) - Season 1.png",
    "/images/Avatar (2009).jpg",
    "/images/Back to the Future (1985).jpeg",
    "/images/Barbie (2023) (1).jpg",
    "/images/Big Hero 6 (2014).jpeg",
    "/images/Bullet Train (2022).jpg",
    "/images/Deadpool- No Good Deed (2017).jpg",
    "/images/Death Note (2006).jpg",
    "/images/Everything Everywhere All at Once (2022).jpg",
    "/images/Fight Club (1999).jpg",
    "/images/Free Guy (2021).jpg",
    "/images/Grave of the Fireflies (1988).jpg",
    "/images/Howl's Moving Castle (2004).jpg",
    "/images/Peacemaker (2022) (1).png",
    "/images/John Wick- Chapter 4 (2023).jpg",
    "/images/Joker (2019).jpeg",
    "/images/Jurassic World Camp Cretaceous (2020).jpg",
    "/images/Knives Out (2019).jpeg",
    "/images/Kong- Skull Island (2017).jpg",
    "/images/La La Land (2016).jpeg",
    "/images/Jurassic World Dominion (2022).jpg",
    "/images/Man of Steel (2013).jpeg",
    "/images/Marvel's Hit-Monkey (2021).png",
    "/images/Marvel's The Punisher (2017).png",
    "/images/Migration (2023).png",
    "/images/Moana (2016).jpeg",
    "/images/Ms. Marvel (2022).png",
    "/images/My Neighbor Totoro (1988).jpg",
    "/images/ODDTAXI (2021).png",
    "/images/Oppenheimer (2023).jpg",
    "/images/Past Lives (2023).png",
    "/images/Ralph Breaks the Internet (2018).jpeg",
    "/images/Elemental (2023).png",
    "/images/Shang-Chi and the Legend of the Ten Rings (2021).jpg",
    "/images/Sonic the Hedgehog (2020).jpg",
    "/images/Spider-Man- Into the Spider-Verse (2018).jpg",
    "/images/Spirited Away (2001).jpg",
    "/images/tick, tick... BOOM! (2021).png",
    "/images/Tarzan (1999).jpeg",
    "/images/Teenage Mutant Ninja Turtles- Mutant Mayhem (2023).jpg",
    "/images/The Batman (2022).png",
    "/images/The Green Knight (2021).png",
    "/images/The Last of Us (2023).png",
    "/images/The Lion King (1994).jpeg",
    "/images/The Matrix (1999).jpg",
    "/images/The Menu (2022).jpg",
    "/images/The Super Mario Bros. Movie (2023).jpg",
    "/images/Top Gun (1986).png",
    "/images/Whiplash (2014).jpeg",
    "/images/Whisper of the Heart (1995).jpg",
    "/images/Zootopia (2016).jpeg",
  ];

  return <ParallaxScroll images={images} />;
};

export default page;
