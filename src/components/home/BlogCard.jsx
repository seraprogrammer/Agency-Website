import React from "react";

const BlogCard = ({ title, img, author, date }) => {
  return (
    <div>
      <img
        className="w-ful max-w-sm mb-6 transition duration-300 hover:scale-105"
        src={img}
        alt=""
      />
      <h3 className="text-xl mb-2">{title}</h3>
      <p className="text-gray-400">
        {date} - by {author}
      </p>
    </div>
  );
};

export default BlogCard;
