import React from "react";
import Marquee from "react-fast-marquee";

const logos = [
  { src: "./logo-cloud/awwards-1.png", alt: "Awwwards Logo" },
  { src: "./logo-cloud/envato-1.png", alt: "Envato Logo" },
  { src: "./logo-cloud/colorlib-1.png", alt: "Colorlib Logo" },
  { src: "./logo-cloud/fwa-1.png", alt: "FWA Logo" },
];

const LogoCloud = () => {
  return (
    <div className="bg-[url('/service-bg.jpg')] bg-cover bg-center -m-4 px-25 py-30 flex gap-5 items-center">
      <div className="basis-1/3">
        <h2 className="w-2/3 text-4xl font-semibold">
          Trusted by industry leaders for 20 years
        </h2>
      </div>
      <div className="basis-2/3 overflow-hidden">
        <Marquee autoFill={true} speed={100}>
          {logos.map((logo, index) => (
            <img
              key={index}
              className="w-30 mx-10"
              src={logo.src}
              alt={logo.alt}
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default LogoCloud;
