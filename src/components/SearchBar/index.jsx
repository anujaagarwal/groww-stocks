import React, { useEffect, useState } from "react";
import { fetchAndCacheApiData, getCachedData } from "../../utils/apiCache"; // Imported cache functions
require("dotenv").config();

export default function SearchBar({ setResults }) {
  const [input, setInput] = useState("");

  const cacheKey = `searchResultsCache_${input}`;

  const fetchData = async (input) => {
    try {
      const cachedData = getCachedData(cacheKey);

      if (cachedData) {
        setResults(cachedData);
      } else {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/search-ticker?query=${input}&limit=10&apikey=${apiKey}`;

        const response = await fetchAndCacheApiData(apiUrl, cacheKey);
        if (response) {
          setResults(response);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(input);
  }, [input]);

  const handleChange = (value) => {
    setInput(value);
  };

  return (
    <div className="flex mt-4 mx-4 sm:mx-0">
      <img
        src="/group.svg"
        className="bg-white pl-4 py-2.5 rounded-l-full"
        alt="search icon"
      ></img>
      <input
        type="text"
        placeholder="Search"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        className="bg-white text-black pl-4 py-2.5 pr-14 sm:pr-60 rounded-r-full outline-none flex-1"
      />
    </div>
  );
}
