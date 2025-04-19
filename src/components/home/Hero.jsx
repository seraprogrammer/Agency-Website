import React from "react";

const Hero = () => {
  return (
    <div className="m-20 flex justify-around items-center">
      <div className="flex-2">
        <h1 className="text-7xl font-semibold ">
          All-in-one solution Unlimited design & development
        </h1>
      </div>
      <div className="flex-1 pl-5">
        <p className="text-2xl p-4 border border-dashed text-neutral-800 font-light  border-gray-400">
          A web design & development studio based in Istria, Croatia
        </p>
        <div className="mt-10   flex gap-4 items-center">
          <div className="flex">
            <img
              className="w-15 rounded-full "
              src="./img1-service.jpg"
              alt=""
            />
            <img
              className="w-15 rounded-full  -ml-4"
              src="./img1-service.jpg"
              alt=""
            />
            <img
              className="w-15 rounded-full  -ml-4"
              src="./img1-service.jpg"
              alt=""
            />
          </div>
          <p className="text-neutral-700 text-lg">
            <span className="font-bold">2.5k</span> Client <br /> In The World
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
