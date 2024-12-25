"use client";

import { useEffect, useState } from "react";

export type UserPreference = {
  theme: "light" | "dark" | "system";
};

const useTheme = () => {
  const storedPreferences = localStorage.getItem("user-preferences");
  const userPreference: UserPreference = storedPreferences
    ? JSON.parse(storedPreferences)
    : { theme: "system" };

  const getCurrentDeviceTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [isDarkTheme, setIsDarkTheme] = useState(
    userPreference.theme === "system" ? getCurrentDeviceTheme() : userPreference.theme === "dark"
  );

  const updateTheme = (theme: UserPreference["theme"]) => {
    setIsDarkTheme(theme === "dark");
    localStorage.setItem("user-preferences", JSON.stringify({ theme }));
  };

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addEventListener("change", (e) => {
      if (userPreference.theme === "system") setIsDarkTheme(e.matches);
    });
    return () => darkThemeMq.removeEventListener("change", () => {});
  }, [userPreference.theme]);

  return { isDarkTheme, updateTheme };
};

export default useTheme;
