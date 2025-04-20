import React from "react";
import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const services = [
    {
      logoUrl: "./service-logos/service-1.svg",
      title: "Creative Design",
      description:
        "Creative design transforms ideas into impactful visuals that elevate your brand identity.",
      link: "/services/creative-design",
      tags: [
        { text: "Design", link: "/tags/design" },
        { text: "Branding", link: "/tags/branding" },
        { text: "UI/UX", link: "/tags/ui-ux" },
      ],
    },
    {
      logoUrl: "./service-logos/svgexport-5.svg",
      title: "Web Development",
      description:
        "Modern and responsive websites built with performance and scalability in mind.",
      link: "/services/web-development",
      tags: [
        { text: "Frontend", link: "/tags/frontend" },
        { text: "Backend", link: "/tags/backend" },
        { text: "Fullstack", link: "/tags/fullstack" },
      ],
    },
    {
      logoUrl: "./service-logos/svgexport-3.svg",
      title: "SEO Optimization",
      description:
        "Boost your website’s visibility and search rankings with our expert SEO services.",
      link: "/services/seo",
      tags: [
        { text: "Marketing", link: "/tags/marketing" },
        { text: "SEO", link: "/tags/seo" },
        { text: "Analytics", link: "/tags/analytics" },
      ],
    },
    {
      logoUrl: "./service-logos/svgexport-4.svg",
      title: "App Development",
      description:
        "We build intuitive, cross-platform mobile apps that solve real-world problems.",
      link: "/services/app-development",
      tags: [
        { text: "Mobile", link: "/tags/mobile" },
        { text: "iOS", link: "/tags/ios" },
        { text: "Android", link: "/tags/android" },
      ],
    },
  ];

  return (
    <div className="bg-[url('/service-bg.jpg')] bg-center bg-cover pt-[500px] pb-[200px] -m-4 mt-100 relative">
      <div className="absolute  m-4 -top-70">
        <img className="w-full rounded-lg " src="./img1-home.jpg" alt="" />
      </div>

      <div className="px-20 grid grid-cols-4 gap-20 ">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
