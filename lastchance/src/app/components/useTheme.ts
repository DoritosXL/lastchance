"use client";

import { useEffect, useState } from "react";

export type UserPreference = {
  theme: "light" | "dark" | "system";
};

const useTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Default theme
  const [themePreference, setThemePreference] = useState<UserPreference["theme"]>("system");

  const getCurrentDeviceTheme = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const updateTheme = (theme: UserPreference["theme"]) => {
    setThemePreference(theme);
    setIsDarkTheme(
      theme === "system" ? getCurrentDeviceTheme() : theme === "dark"
    );
    localStorage.setItem("user-preferences", JSON.stringify({ theme }));
  };

  useEffect(() => {
    // Only execute in the browser
    if (typeof window === "undefined") return;

    const storedPreferences = localStorage.getItem("user-preferences");
    const userPreference: UserPreference = storedPreferences
      ? JSON.parse(storedPreferences)
      : { theme: "system" };

    setThemePreference(userPreference.theme);

    setIsDarkTheme(
      userPreference.theme === "system"
        ? getCurrentDeviceTheme()
        : userPreference.theme === "dark"
    );

    // Listen for system theme changes
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (userPreference.theme === "system") {
        setIsDarkTheme(e.matches);
      }
    };

    darkThemeMq.addEventListener("change", handleChange);

    return () => darkThemeMq.removeEventListener("change", handleChange);
  }, []);

  return { isDarkTheme, themePreference, updateTheme };
};

export default useTheme;
