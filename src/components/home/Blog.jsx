import React from "react";
import BlogCard from "./BlogCard";

const Blog = () => {
  const blogs = [
    {
      title: "Getting Started with Next.js: A Beginner’s Guide",
      author: "Admin",
      date: "15 Jan 2024",
      img: "./blog-img/img1.jpg",
    },
    {
      title: "Top 10 React Hooks You Should Know in 2024",
      author: "Emily Chen",
      date: "28 Feb 2024",
      img: "./blog-img/img2.jpg",
    },
    {
      title: "Building SEO-Friendly Websites with Next.js",
      author: "Michael Lee",
      date: "10 Mar 2024",
      img: "./blog-img/img3.jpg",
    },
  ];

  return (
    <div className="my-20 mx-40">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-6xl">
          Our latest blog <br /> and Articles
        </h2>
        <p className="text-gray-400 w-2/5">
          Explore our latest blog and articles for expert insights on web
          design, SEO, and digital trends.
        </p>
        <button className="w-30 h-30 p-5 rounded-full bg-[#E3FF75]">
          View all post
        </button>
      </div>

      <div className="grid grid-cols-3 gap-10 mt-15 [&>:nth-child(2)]:pt-10">
        {blogs.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
