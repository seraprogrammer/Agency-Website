import React from "react";

const Portfolio = () => {
  return (
    <div className="px-20 py-40 flex items-start gap-10 bg-[url('./img1-home.jpg')]">
      <div className="sticky top-10 flex-2/5">
        <h2 className="text-8xl font-semibold text-neutral-800">
          Award winning creativity
        </h2>
      </div>

      <div className="  flex flex-col items-center gap-20 flex-3/5">
        <div className="w-3/4">
          <img
            className="block w-full"
            src="./portfolio-img/portfolio-1.jpg"
            alt=""
          />
          <h2 className="text-2xl mt-5 mb-1 font-semibold">
            Mobile App Design
          </h2>
          <p className="text-neutral-600">DESIGN-2025</p>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <img
              className="block w-full"
              src="./portfolio-img/portfolio-2.jpg"
              alt=""
            />
            <h2 className="text-2xl mt-5 mb-1 font-semibold">
              Branding Design
            </h2>
            <p className="text-neutral-600">DESIGN-2025</p>
          </div>
          <div>
            <img
              className="block w-full"
              src="./portfolio-img/portfolio-3.jpg"
              alt=""
            />
            <h2 className="text-2xl mt-5 mb-1 font-semibold">
              Web Development
            </h2>
            <p className="text-neutral-600">DESIGN-2025</p>
          </div>
        </div>

        <div className="w-3/4">
          <img
            className="block w-full"
            src="./portfolio-img/portfolio-4.jpg"
            alt=""
          />
          <h2 className="text-2xl mt-5 mb-1 font-semibold">
            Digital Marketing
          </h2>
          <p className="text-neutral-600">DESIGN-2025</p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
