import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = {
    services: [
      { text: "UI/UX Design", path: "/ui-ux-design" },
      { text: "Web Design", path: "/web-design" },
      { text: "Branding", path: "/branding" },
      { text: "Development", path: "/development" },
    ],
    company: [
      { text: "Home", path: "/" },
      { text: "About Us", path: "/about" },
      { text: "Service", path: "/service" },
      { text: "Contact", path: "/contact" },
    ],
  };

  const phones = ["+1 234 567 8910", "+1 234 567 8910"];
  const emails = ["hello@example.com", "hello@example.com"];

  return (
    <footer className="bg-black text-white pt-30 pb-5 px-30">
      {/* footer top */}
      <div className="grid grid-cols-2 gap-y-30 gap-x-30">
        <p className="text-bolder text-7xl">
          Let's make something great work together.
        </p>

        <div className="flex gap-20 ml-30 [&>div>a]:block [&>div>a]:mb-3 [&>div>a]:text-neutral-300 [&>div>a]:text-lg [&>div>a]:hover:text-yellow-200">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Services</h2>
            {links.services.map(({ text, path }, index) => (
              <Link to={`service/${path}`} key={index}>
                {text}
              </Link>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-6">Company</h2>
            {links.company.map(({ text, path }, index) => (
              <Link to={path} key={index}>
                {text}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex gap-20 [&>div>a]:block [&>div>a]:mb-1 [&>div>a]:text-neutral-300 [&>div>a]:text-lg">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Call Us</h2>
            {phones.map((phone, index) => (
              <a href={`tel:${phone}`} key={index}>
                {phone}
              </a>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send Message</h2>
            {emails.map((email, index) => (
              <a href={`mailto:${email}`} key={index}>
                {email}
              </a>
            ))}
          </div>
        </div>

        <div className="ml-30">
          <h2 className="text-2xl font-semibold mb-8">Newsletter</h2>
          <form>
            <div className="flex gap-4 items-center justify-between pb-3 border-b-1">
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="border-none outline-0"
              />
              <button className="text-yellow-200 text-xl" type="submit">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* footer bottom */}
      <div className="mt-30">
        <hr className="text-neutral-800" />
        <p className="my-5 text-neutral-300">
          &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
