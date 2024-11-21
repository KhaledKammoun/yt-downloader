"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

dotenv.config();

import dotenv from "dotenv";
import DarkModeToggle from "./DarkModeToggle/page";
const key = process.env.YT_API_KEY;
const MainPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [downloading, setDownloading] = useState(null);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    const apiKey = key; // Replace with your actual API key
    const maxResults = 5;
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}&maxResults=${maxResults}`;

    try {
      const response = await axios.get(searchUrl);
      setResults(response.data.items);
    } catch (error) {
      console.error("Error searching YouTube:", error);
    }
  };
  const handleDownload = async (videoId: any, resolution: any) => {
    setDownloading(videoId);
    try {
      const response = await axios.post("http://localhost:3001/api/download", {
        videoId,
        resolution,
      });
      const downloadLink = document.createElement("a");
      downloadLink.href = `/download?path=${encodeURIComponent(
        response.data.filePath
      )}`;
      downloadLink.download = `${videoId}_${resolution}.mp4`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error downloading video:", error);
    } finally {
      setDownloading(null);
    }
  };
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
        <div>
          <DarkModeToggle />
        </div>
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
      <main className="min-h-screen flex flex-col items-center justify-center flex-1">
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
        <div className="flex justify-center mt-72">
          <a
            href="#next-section"
            className="animate-bounce  block bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full text-center"
          >
            <svg
              className="w-12 h-12"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 12a1 1 0 01-.7-.3l-5-5a1 1 0 011.4-1.4L10 9.6l4.3-4.3a1 1 0 011.4 1.4l-5 5a1 1 0 01-.7.3z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </main>
      {/* Button to scroll to the next section */}

      {/* Next Section */}
      <section
        className="flex flex-col items-center justify-center flex-1 min-h-screen"
        id="next-section"
      >
        <h2 className="text-3xl font-bold mb-4">Paste URL and Download</h2>
        <form className="max-w-md mx-auto w-full" onSubmit={handleSearch}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              type="text"
              placeholder="Search for videos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-red-500 to-red-700 text-white absolute end-2.5 bottom-2.5  hover:bg-red-800  focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </form>
        <div className="mt-8">
          {results.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Results:</h3>
              <ul>
                {results.map((result) => (
                  <li key={result.id.videoId} className="mb-4">
                    <a
                      href={`https://www.youtube.com/watch?v=${result.id.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex items-center">
                        <img
                          src={result.snippet.thumbnails.default.url}
                          alt={result.snippet.title}
                          className="mr-4"
                        />
                        <div>
                          <h4 className="font-bold">{result.snippet.title}</h4>
                          <p>{result.snippet.description}</p>
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleDownload(result.id.videoId, "1080p")
                              }
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              1080p
                            </button>
                            <button
                              onClick={() =>
                                handleDownload(result.id.videoId, "720p")
                              }
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              720p
                            </button>
                            <button
                              onClick={() =>
                                handleDownload(result.id.videoId, "480p")
                              }
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              480p
                            </button>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Add your form or download components here */}
      </section>
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
