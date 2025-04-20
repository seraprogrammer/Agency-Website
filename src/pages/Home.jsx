import React from "react";
import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import Portfolio from "../components/home/Portfolio";
import MarqueeSection from "../components/home/Marquee";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <MarqueeSection />
    </>
  );
};

export default Home;
