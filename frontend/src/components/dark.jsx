import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className=" p-1 md:px-4 md:py-2 md:dark:bg-gray-800 md:bg-gray-200  cursor-pointer transition-all duration-300 rounded-md"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}
