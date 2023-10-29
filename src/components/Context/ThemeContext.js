// ThemeContext.js
import React, { createContext, useContext, useState, useCallback } from "react";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    color: "white",
    backgroundColor: "black",
  });

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      return prevTheme.color === "white"
        ? { color: "white", backgroundColor: "rgb(59 130 246)" }
        : { color: "white", backgroundColor: "black" };
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
