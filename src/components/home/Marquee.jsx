import React from "react";
import Marquee from "react-fast-marquee";

const MarqueeSection = () => {
  return (
    <>
      <Marquee
        className="text-7xl text-gray-300 overflow-hidden  items-center leading-tight"
        speed={100}
        gradient={true}
      >
        <span className="mx-10">Marketing</span>
        <span className="mx-10">Web Development</span>
        <span className="mx-10">UI/UX Design</span>
        <span className="mx-10">SEO</span>
      </Marquee>
      <div className="-mx-4 mt-1">
        <img className="w-full" src="./img5-team.jpg" alt="" />
      </div>
    </>
  );
};

export default MarqueeSection;
