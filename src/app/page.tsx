"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MainPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    setIsMobile(isMobile);
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth <= 768); // Change 768 to your desired breakpoint
    };

    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className=" from-black via-gray-800 to-blue-200 p-4 flex items-center justify-between w-full">
        {/* Logo or Brand */}
        <div className="text-lg font-bold hover:cursor-pointer">
          <span className="bg-gradient-to-r from-red-500 to-red-700 text-white px-2 py-1 rounded">
            YT
          </span>{" "}
          Downloader
        </div>
        {/* Navigation Links - Desktop */}
        <div className="hidden  items-center justify-between md:flex space-x-4 text-gray-600 dark:text-gray-300">
          <a href="#" className="block md:px-4 transition hover:text-red-500">
            Home
          </a>
          <a href="#" className="block md:px-4 transition hover:text-red-500">
            About
          </a>
          <a href="#" className="block md:px-4 transition hover:text-red-500">
            Services
          </a>
          <Link
            href="/Auth"
            className="block bg-gradient-to-r from-red-500 to-red-700 text-white px-2 py-1 rounded text-center font-semibold transition duration-300 hover:scale-105 active:scale-95"
          >
            <span className="relative text-sm font-semibold text-white">
              Get Started
            </span>
          </Link>
          {/* Add more links as needed */}
        </div>
        {/* Navigation Button - Mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleNav}
          aria-label="Toggle Navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isNavOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isNavOpen && isMobile && (
        <div className="absolute top-14 right-2 w-36 bg-gray-800 shadow-md p-2 rounded-lg">
          <a href="#" className="block mb-2 text-center hover:text-red-500">
            Home
          </a>
          <a href="#" className="block mb-2 text-center hover:text-red-500">
            About
          </a>
          <a href="#" className="block mb-2 text-center hover:text-red-500">
            Services
          </a>
          <Link
            href="/Auth"
            className="block bg-gradient-to-r from-red-500 to-red-700 text-white px-2 py-1 rounded text-center font-semibold transition duration-300 hover:scale-105 active:scale-95"
          >
            Get Started
          </Link>
          {/* Add more links as needed */}
        </div>
      )}

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">
          Save Videos for Later{" "}
          <span className="text-gradient">Enjoyment.</span>
        </h1>
        <h1 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-red-500 to-red-700 text-white px-2 py-1 rounded">
            YT
          </span>{" "}
          Downloader
        </h1>
        {/* Additional content or sections can be added here */}
      </main>

      {/* Footer */}

      <footer
        className={`bg-white ${
          isMobile ? "flex items-center justify-center" : ""
        } rounded-lg shadow m-2 dark:bg-gray-800`}
      >
        <div className=" mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://github.com/KhaledKammoun"
              className="text-red-400 hover:text-red-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              Khaled Kammoun
            </a>
            . All rights reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
