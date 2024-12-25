"use client";

import { useEffect } from "react";
import useTheme from "./components/useTheme";
import CoverGrid from "./components/CoverGrid";
import GithubLogoSVG from "./components/GithubLogoSVG";
import ClbLogoSVG from "./components/ClbLogo";

export default function MainPage() {
  const { isDarkTheme, updateTheme } = useTheme();

  const handleThemeChange = () => {
    updateTheme(!isDarkTheme ? "dark" : "light");
  };

  useEffect(() => {
    const htmlElement = document.getElementById("html");
    if (htmlElement) {
      htmlElement.className = isDarkTheme ? "theme-dark" : "theme-light";
    }
  }, [isDarkTheme]);

  return (
    <div
      className={`app ${
        isDarkTheme ? "theme-dark" : "theme-light"
      } transition-colors duration-300 ease-in min-h-screen flex flex-col items-center px-4`}
    >
      <svg
        className="w-full max-w-[150px] sm:max-w-[200px] mt-8 sm:mt-12 mb-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 248.2 194.78"
      >
        <ClbLogoSVG isDarkTheme={isDarkTheme ? "dark" : "light"} />
      </svg>
      <h1 className="text-base font-extrabold text-center sm:text-lg">
        Cover Generator
      </h1>
      <h2 className="text-sm font-normal text-center sm:text-base">
        Click on an emoji to edit or remove
      </h2>
      <CoverGrid />
      <div className="my-6 flex flex-col sm:flex-row gap-3 font-bold text-center">
        <a
          href="https://github.com/DoritosXL"
          className="flex items-center justify-center text-inherit"
        >
          <GithubLogoSVG theme={isDarkTheme ? "dark" : "light"} />
          <p className="ml-1">DoritosXL</p>
        </a>
        <a
          href="https://github.com/UNRULYEON"
          className="flex items-center justify-center text-inherit"
        >
          <GithubLogoSVG theme={isDarkTheme ? "dark" : "light"} />
          <p className="ml-1">UNRULYEON</p>
        </a>
      </div>
      <div className="my-5 flex flex-col items-center sm:flex-row gap-3">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isDarkTheme}
            onChange={handleThemeChange}
            className="hidden"
          />
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Change theme:</span>
            <div
              className={`relative w-12 h-6 cursor-pointer rounded-full transition-colors duration-300 ease-in-out ${
                isDarkTheme ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                  isDarkTheme ? "translate-x-6" : ""
                }`}
              ></div>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
