import React from "react";
import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import Portfolio from "../components/home/Portfolio";
import MarqueeSection from "../components/home/Marquee";
import Blog from "../components/home/Blog";
import LogoCloud from "../components/home/LogoCloud";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <MarqueeSection />
      <Blog />
      <LogoCloud />
    </>
  );
};

export default Home;
