// Imports
import React from "react";
import SearchBar from "../SearchBar";
import SearchResultsList from "../SearchResultsList";
import { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
// Navbar component
export default function Navbar() {
  const [results, setResults] = useState([]);
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="mx-auto w-full">
      <nav
        className="bg-blue-500 py-4 pl-5 flex flex-col sm:flex-row items-center justify-between"
        style={theme}
      >
        <p className="text-white font-bold text-xl">GrowwStocks</p>
        <div className="flex flex-col items-start sm:items-center">
          <SearchBar setResults={setResults} />
          <SearchResultsList results={results} />
        </div>
        <button
          onClick={toggleTheme}
          className="border border-solid  mr-4 rounded-md p-2"
        >
          Theme
        </button>
      </nav>
    </div>
  );
}
