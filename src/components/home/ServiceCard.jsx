import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ logoUrl, title, description, link, tags }) => {
  return (
    <div className="max-w-md transition-all hover:[&>img]:scale-110">
      <img src={logoUrl} alt="" className="transition duration-300" />
      <h2 className="mt-5 text-2xl font-semibold">{title}</h2>
      <p className=" mt-4 text-neutral-800">{description}</p>

      <Link
        to={link}
        className="group relative inline-block mt-4 py-2 px-4 border border-neutral-500 text-black hover:text-[#ccff66] overflow-hidden transition-colors duration-300"
      >
        <span className=" text-sm relative z-10 flex items-center">
          Read More{" "}
          <i className="ml-2 text-sm fas fa-arrow-up-right-from-square"></i>
        </span>
        <span
          className="absolute inset-0 z-0 bg-black transition-transform duration-500 origin-bottom-left scale-x-0 group-hover:scale-x-100"
          style={{ transformOrigin: "bottom left" }}
        ></span>
      </Link>

      {/* Improved HR */}
      <hr className="border-t border-neutral-600 my-4" />

      {/* Tag links */}
      <div className="flex gap-4 text-sm [&>a]:py-1 [&>a]:px-2 [&>a]:bg-[#0000000a] [&>a]:rounded-sm [&>a]:hover:bg-black [&>a]:hover:text-[#ccff66]">
        {tags.map((tag) => (
          <Link to={tag.link}>{tag.text}</Link>
        ))}
      </div>
    </div>
  );
};

export default ServiceCard;
