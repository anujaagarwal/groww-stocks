import React from "react";
import SearchResult from "../SearchResult";

export default function SearchResultsList({ results }) {
  if (!Array.isArray(results)) {
    return (
      <div className="bg-black text-white">
        <p>Error: Results are not available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-white flex flex-col backdrop-blur-xl rounded mt-4 max-h-64 overflow-y-scroll">
      {console.log("results", results.data)}

      {results.map((result) => {
        const symbol = result["symbol"];
        const name = result["name"];
        return <SearchResult symbol={symbol} name={name} />;
      })}
    </div>
  );
}
