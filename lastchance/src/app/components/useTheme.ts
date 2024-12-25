"use client";

import { useEffect, useState } from "react";

export type UserPreference = {
  theme: "light" | "dark" | "system";
};

const useTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Default theme
  const [themePreference, setThemePreference] =
    useState<UserPreference["theme"]>("system");

  const getCurrentDeviceTheme = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const updateTheme = (theme: UserPreference["theme"]) => {
    setThemePreference(theme);
    const isDark =
      theme === "system" ? getCurrentDeviceTheme() : theme === "dark";
    setIsDarkTheme(isDark);

    // Update the `html` class
    document.documentElement.classList.toggle("theme-dark", isDark);
    document.documentElement.classList.toggle("theme-light", !isDark);

    localStorage.setItem("user-preferences", JSON.stringify({ theme }));
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedPreferences = localStorage.getItem("user-preferences");
    const userPreference: UserPreference = storedPreferences
      ? JSON.parse(storedPreferences)
      : { theme: "system" };

    const isDark =
      userPreference.theme === "system"
        ? getCurrentDeviceTheme()
        : userPreference.theme === "dark";

    setThemePreference(userPreference.theme);
    setIsDarkTheme(isDark);
  }, []);

  return { isDarkTheme, themePreference, updateTheme };
};

export default useTheme;
