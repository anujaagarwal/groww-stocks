import React, { useState, useEffect } from "react";

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setIsDarkMode(savedMode === "true");
    }
  }, []);

  // Handled toggling the dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#6B7280"; // Set your preferred background color
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "white"; // Set your preferred background color for light mode
    }
  };

  return (
    <div className="relative">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="hidden"
            onChange={toggleDarkMode}
            checked={isDarkMode}
          />
          <div className="toggle-line w-10 h-4 bg-gray-400 dark:bg-gray-700 rounded-full shadow-inner"></div>
          <div
            className={`toggle-dot absolute w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md transform ${
              isDarkMode ? "translate-x-6 transition-transform" : ""
            }`}
          ></div>
        </div>
        <div className="ml-3 text-gray-700 dark:text-gray-300 font-medium">
          Dark Mode
        </div>
      </label>
    </div>
  );
}

export default DarkModeToggle;
